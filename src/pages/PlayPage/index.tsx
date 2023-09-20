import XKryss from '../../assets/Xkryss.png';
import Hjertehjarte from '../../assets/Hjertehjarte.png';
import Back from '../../assets/Back.png';
import './index.css';
import { Link } from 'react-router-dom';
import { Song, SpotifyAPI } from '../../utils/authentication.ts';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

function PlayPageSong(props: { albumCover: string; title: string; artist: string; onRate: (liked: boolean) => void }) {
  return (
    <div id="songContainer">
      <img id="albumCover" src={props.albumCover} alt="Søt liten guttelutt" />
      <span id="sang">{props.title}</span>
      <span id="artist">{props.artist}</span>
      <div id="flexContainerIcons">
        <div className="rateButton" id="dislike" onClick={() => props.onRate(false)}>
          <img src={XKryss} alt="X" />
        </div>
        <div className="rateButton" id="like" onClick={() => props.onRate(true)}>
          <img src={Hjertehjarte} alt="<3" />
        </div>
      </div>
    </div>
  );
}

export type SongRating = {
  songId: string;
  liked: boolean;
};

export default function PlayPage() {
  const spotify = SpotifyAPI.getAuthorization()!;

  const songQuery = useQuery('song', () => spotify.getSongs());
  const [ratedSongs, setRatedSongs] = useState<SongRating[]>(JSON.parse(localStorage.getItem('ratedSongs') ?? '[]'));
  const ratedSongIds = ratedSongs.map((song) => song.songId);

  useEffect(() => {
    localStorage.setItem('ratedSongs', JSON.stringify(ratedSongs));
  }, [ratedSongs]);
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
                setRatedSongs([...ratedSongs, { songId: song.track.id, liked }]);
              }}
            />
          ))
      ) : (
        <></>
      )}
      <Link to="/">
        <img id="back" src={Back} alt="<" />
      </Link>
    </div>
  );
}
