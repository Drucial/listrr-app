import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="user-profile">
        <div className="avatar-container">
          <img src={user.picture} alt={user.name} />
        </div>
        <div className="profile-details">
          <h3>{user.name}</h3>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="user-profile">
        <div className="profile-details">
          <button onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      </div>
    )
  }
}

export default Login
