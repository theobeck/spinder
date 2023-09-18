export type User = {
  display_name: string;
  email: string;
  images: { url: string }[];
};

export type Song = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
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
      console.log("I AM STORED")
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

  public async getUser(): Promise<User | null> {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });

    if (response.status === 200) return (await response.json()) as User;
    return null;
  }

  public async getSongs(): Promise<{ items: { track: Song }[] } | null> {
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1E39mMy1G56U5M/tracks', {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });

    if (response.status === 200) return (await response.json()) as { items: { track: Song }[] };
    return null;
  }

  public async getSongInfo(songIDs: string[]): Promise<{ tracks: Song[] } | null> {
    const response = await fetch('https://api.spotify.com/v1/tracks?ids=' + songIDs.join(','), {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });

    if (response.status === 200) return (await response.json()) as { tracks: Song[] };
    return null;
  }

  public logout() {
    sessionStorage.removeItem('authorization');
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
