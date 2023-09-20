import { useQuery } from 'react-query';
import { SpotifyAPI } from '../../utils/authentication.ts';
import './index.css';

export default function UserDisplay() {
  const authorization = SpotifyAPI.getAuthorization!();

  const userQuery = useQuery('user', () => authorization?.getUser());

  return (
    <div className="user-display">
      {userQuery.data ? (
        <div id="userContainer">
          <button id="logoutButton" onClick={() => authorization?.logout()}>
            Logout
          </button>
          <span id="userName">{userQuery.data.display_name}</span>
          <img id="userImage" src={userQuery.data.images[0].url} alt="User" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
