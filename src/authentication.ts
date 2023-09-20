export type Image = { url: string };
export type Artist = { name: string };

const SOURCE_PLAYLIST = '37i9dQZF1E39mMy1G56U5M';

export type User = {
  display_name: string;
  email: string;
  images: Image[];
};

export type Song = {
  id: string;
  name: string;
  artists: Artist[];
  album: { name: string; images: Image[] };
  duration_ms: number;
};

export class SpotifyAPI {
  access_token: string;
  expires: number;

  constructor(access_token: string, expires: number) {
    this.access_token = access_token;
    this.expires = expires;
  }

  public static getAuthorization(): SpotifyAPI | null {
    const storedAuth = sessionStorage.getItem('authentication');
    if (storedAuth) {
      console.log('I AM STORED');
      const auth = JSON.parse(storedAuth);
      const access_token = auth.access_token;
      const expires = auth.expires;
      console.log(access_token);

      if (expires < Date.now()) {
        sessionStorage.removeItem('authentication');
        console.log('Authentication expired');
      } else {
        return new SpotifyAPI(access_token, expires);
      }
    }

    return null;
  }

  private async apiCall(endpoint: string, params?: string): Promise<any> {
    const response = await fetch(`${endpoint}${params || ''}`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }

    return response.json();
  }

  public async getUser(): Promise<User | null> {
    try {
      return (await this.apiCall('https://api.spotify.com/v1/me')) as User;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getSongs(): Promise<{ items: { track: Song }[] } | null> {
    try {
      return (await this.apiCall(`https://api.spotify.com/v1/playlists/${SOURCE_PLAYLIST}/tracks`)) as {
        items: { track: Song }[];
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getSongInfo(songIDs: string[]): Promise<{ tracks: Song[] } | null> {
    try {
      return (await this.apiCall('https://api.spotify.com/v1/tracks', `?ids=${songIDs.join(',')}`)) as {
        tracks: Song[];
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public logout() {
    sessionStorage.removeItem('authentication');
    window.location.href = '/';
  }
}

export function storeAuthorization(auth: SpotifyAPI) {
  sessionStorage.setItem('authentication', JSON.stringify({ access_token: auth.access_token, expires: auth.expires }));
}

export function parseAuthorizationHash(hash: string): SpotifyAPI | null {
  const params = new URLSearchParams(hash.substring(1));
  const access_token = params.get('access_token');
  const expires = params.get('expires_in');
  if (!access_token || !expires) return null;
  return new SpotifyAPI(access_token, Date.now() + parseInt(expires) * 1000);
}
