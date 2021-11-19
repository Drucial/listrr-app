import React from "react";
import UserProfile from './UserProfile'
import Login from './Login'

const UserHeader = () => {
  let user = ""
  if(user) {
    return (
      <header>
        <UserProfile />
      </header>
    );
  }

  return (
    <header>
      <Login />
    </header>
  );
	
};

export default UserHeader;
