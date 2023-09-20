import XKryss from "../../assets/Xkryss.png";
import Hjertehjarte from "../../assets/Hjertehjarte.png";
import "./index.css";

export default function PlayPageSong(props: { albumCover: string; title: string; artist: string; onRate: (liked: boolean) => void }) {
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