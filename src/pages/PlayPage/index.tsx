import './index.css';
import { Song, SpotifyAPI } from '../../utils/authentication.ts';
import { useQuery } from 'react-query';
import { useState } from 'react';
import PlayPageSong from "../../components/SongDisplay";
import {getRatedSongs, rateSong} from "../../utils/favoriteSongs.ts";
import BackButton from "../../components/BackButton";

export type SongRating = {
  songId: string;
  liked: boolean;
};

export default function PlayPage() {
  const spotify = SpotifyAPI.getAuthorization()!;

  const songQuery = useQuery('song', () => spotify.getSongs());
  const [ratedSongs, setRatedSongs] = useState<SongRating[]>(getRatedSongs());
  const ratedSongIds = ratedSongs.map((song) => song.songId);

  return (
    <div className="wrapper">
      {songQuery.data && songQuery.data.items ? (
        songQuery.data.items
          .filter((song: { track: Song }) => !ratedSongIds.includes(song.track.id))
          .slice(0, 1)
          .map((song: { track: Song }) => (
            <PlayPageSong
              albumCover={song.track.album.images[0].url}
              key={song.track.id}
              title={song.track.name}
              artist={song.track.artists[0].name}
              onRate={(liked) => {
                rateSong(song.track.id, liked);
                setRatedSongs(getRatedSongs());
              }}
            />
          ))
      ) : (
        <></>
      )}
      <BackButton/>
    </div>
  );
}
