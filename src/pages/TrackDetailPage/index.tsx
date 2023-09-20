import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {SpotifyAPI} from "../../utils/authentication.ts";
import BackButton from "../../components/BackButton";
import "./index.css";

export default function TrackDetailPage() {
    const { trackId } = useParams<{ trackId: string }>();
    const spotify = SpotifyAPI.getAuthorization()!;

    const trackQuery = useQuery('track', () => {
        return trackId === undefined ? null : spotify.getTrack(trackId);
    });

    return <div className="track-detail-container">
        <BackButton/>
        { trackQuery.data && <div className="track-details">
            <img src={trackQuery.data.album.images[0].url} alt="Album cover" />
            <p className="track-details-name">
                {trackQuery.data.name} by {trackQuery.data.artists.map((artist) => artist.name).join(', ')}
            </p>
            <Link className="track-details-link" to={trackQuery.data.uri}>Listen on Spotify</Link>
        </div>}
    </div>

}