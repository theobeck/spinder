import "./index.css";
import { Link } from "react-router-dom";

interface FavoriteSongItemProps {
    albumCover: string;
    title: string;
    artist: string;
    songId: string;
    onUnlike: () => void;
}

export default function FavoritesSongItem(props: FavoriteSongItemProps) {
    return (
        <div className="song-item">
            <Link to={`/track/${props.songId}`}>
                <img src={props.albumCover} alt="Song 1" />
            </Link>
            <div className="song-details">
                <p className="song-title">{props.title}</p>
                <p className="song-artist">{props.artist}</p>
            </div>
            <div className="song-options">
                <button className="song-unlike-button" onClick={props.onUnlike}>🗙</button>
            </div>
        </div>
    );
}