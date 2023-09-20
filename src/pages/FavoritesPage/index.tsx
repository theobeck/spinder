import Back from '../../assets/back.png';
import './index.css';
import { Link } from 'react-router-dom';
import { SpotifyAPI } from '../../utils/authentication.ts';
import { useQuery } from 'react-query';
import { SongRating } from '../PlayPage';
import FavoritesSongItem from "../../components/FavoriteSongItem";
import {getRatedSongs, unlikeSong} from "../../utils/favoriteSongs.ts";

export default function FavoritesPage() {
  const spotifyAPI = SpotifyAPI.getAuthorization()!;

  const songQuery = useQuery(
    'song',
    () => spotifyAPI.getSongInfo(getRatedSongs().filter(song => song.liked).map((song: SongRating) => song.songId)),
    {
      enabled: getRatedSongs().filter(song => song.liked).length > 0, // Enable the query only if favoriteSongs is not empty
    }
  )

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
              onUnlike={() => {
                  unlikeSong(track.id);
                  songQuery.refetch().then();
              }}
            />
          ))}
      </div>
    </>
  );
}
