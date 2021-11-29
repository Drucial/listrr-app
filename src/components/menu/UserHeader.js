import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'

const UserHeader = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext)

  if (isLoading) {
    return <div className="user-profile"><h3>Loading ...</h3></div>;
  }

  if (isAuthenticated) {
    return (
      <header>
        <div className="user-profile">
          <img src={currentUser.picture} alt={currentUser.nickname || currentUser.name} />
          <div className="profile-details">
            <h3 id="userName">{currentUser.nickname || currentUser.name}</h3>
            <button className="btn-outline"onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          </div>
        </div>
        <h2>Saved Lists</h2>
      </header>
    )
  } else {
    return (
      <header>
        <div className="user-profile">
          <div className="profile-details">
            <button onClick={() => loginWithRedirect()}>Log in</button>
          </div>
        </div>
      </header>
    )
  }
}

export default UserHeader;
