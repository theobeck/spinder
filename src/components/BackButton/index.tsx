import Back from "../../assets/Back.png";
import {useNavigate} from "react-router-dom";
import "./index.css";

export default function BackButton() {
    const navigate = useNavigate();

    return <img className="back-button" alt="Back button" src={Back} onClick={() => navigate(-1)} />
}