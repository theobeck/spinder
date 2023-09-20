import './index.css';
import SpinderLogoTitle from '../../assets/SpinderLogoTitle.png';
import { Link } from 'react-router-dom';
import UserDisplay from '../../components/UserDisplay';

export default function IndexPage() {
  return (
    <div className="wrapper">
      <UserDisplay />
      <img id="spinderLogo" src={SpinderLogoTitle} alt="Spinder Logo" />
      <div className="flexContainer">
        <Link to="play" className="chooseBox">
          <span className="chooseBoxText">PLAY</span>
        </Link>
        <Link to="favorites" className="chooseBox">
          <span className="chooseBoxText">FAVORITES</span>
        </Link>
      </div>
      <div className="flexContainer" id="container2">
        <Link to="playlists" className="chooseBox">
          <span className="chooseBoxText">PLAYLISTS</span>
        </Link>
        <Link to="settings" className="chooseBox">
          <span className="chooseBoxText">SETTINGS</span>
        </Link>
      </div>
    </div>
  );
}
