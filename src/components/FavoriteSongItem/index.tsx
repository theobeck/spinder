import "./index.css";

export default function FavoritesSongItem(props: { albumCover: string; title: string; artist: string }) {
    return (
        <div className="song-item">
            <img src={props.albumCover} alt="Song 1" />
            <div className="song-details">
                <p className="song-title">{props.title}</p>
                <p className="song-artist">{props.artist}</p>
            </div>
        </div>
    );
}