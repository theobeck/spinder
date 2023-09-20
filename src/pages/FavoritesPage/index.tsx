import Back from '../../assets/back.png';
import './index.css';
import { Link } from 'react-router-dom';
import { SpotifyAPI } from '../../utils/authentication.ts';
import { useQuery } from 'react-query';
import { SongRating } from '../PlayPage';

function FavoritesSongItem(props: { albumCover: string; title: string; artist: string }) {
  return (
    <div className="song-item">
      <img src={props.albumCover} alt="Song 1" />
      <div className="song-details">
        <p className="song-title">{props.title}</p>
        <p className="song-artist">{props.artist}</p>
      </div>
      {/*
                <p className="song-duration">3:45</p>
                <div className="song-controls">
                    <button>&#9654;</button>
                </div>
             */}
    </div>
  );
}

export default function FavoritesPage() {
  const spotifyAPI = SpotifyAPI.getAuthorization()!;

  const favoriteSongs = (JSON.parse(localStorage.getItem('ratedSongs') ?? '[]') as SongRating[]).filter(
    (song: SongRating) => song.liked,
  );

  const songQuery = useQuery(
    'song',
    () => spotifyAPI.getSongInfo(favoriteSongs.map((song: SongRating) => song.songId)),
    {
      enabled: favoriteSongs.length > 0, // Enable the query only if favoriteSongs is not empty
    },
  );

  console.log(songQuery.data);

  return (
    <>
      <h1>Favorites</h1>
      <Link to="/">
        <img id="back" src={Back} />
      </Link>
      <div className="song-list">
        {songQuery.data &&
          songQuery.data.tracks &&
          songQuery.data.tracks.map((track) => (
            <FavoritesSongItem
              albumCover={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              key={track.id}
            />
          ))}
      </div>
    </>
  );
}
