import './index.css';
import { SpotifyAPI } from '../../utils/authentication.ts';
import { useQuery } from 'react-query';
import { SongRating } from '../PlayPage';
import FavoritesSongItem from "../../components/FavoriteSongItem";
import {getRatedSongs, unlikeSong} from "../../utils/favoriteSongs.ts";
import BackButton from "../../components/BackButton";
import {useEffect, useState} from "react";

export default function FavoritesPage() {
  const spotifyAPI = SpotifyAPI.getAuthorization()!;

  const songQuery = useQuery(
    'song',
    () => spotifyAPI.getSongInfo(getRatedSongs().filter(song => song.liked).map((song: SongRating) => song.songId)),
    {
      enabled: getRatedSongs().filter(song => song.liked).length > 0, // Enable the query only if favoriteSongs is not empty
    }
  )
    const [query, setQuery] = useState<string>(sessionStorage.getItem("searchQuery") || "");
  useEffect(() => {
    sessionStorage.setItem("searchQuery", query);
    }, [query]);

  return (
    <>
      <h1 id="header">Favorites</h1>
        <BackButton/>
      <div className="song-list">
          <input
              id="song-list-search"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
          />
        {songQuery.data &&
          songQuery.data.tracks &&
          songQuery.data.tracks
            .filter((track) => track.name.toLowerCase().includes(query.toLowerCase()))
              .map((track) => (
            <FavoritesSongItem
              albumCover={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              key={track.id}
              songId={track.id}
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
