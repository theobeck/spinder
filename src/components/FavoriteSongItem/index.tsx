import "./index.css";

interface FavoriteSongItemProps {
    albumCover: string;
    title: string;
    artist: string;
    onUnlike: () => void;
}

export default function FavoritesSongItem(props: FavoriteSongItemProps) {
    return (
        <div className="song-item">
            <img src={props.albumCover} alt="Song 1" />
            <div className="song-details">
                <p className="song-title">{props.title}</p>
                <p className="song-artist">{props.artist}</p>
            </div>
            <div className="song-options">
                <button className="song-unlike-button" onClick={props.onUnlike}>❤️</button>
            </div>
        </div>
    );
}