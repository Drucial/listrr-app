import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'

const SavedLists = ({ menuState }) => {
  const { currentUser, setCurrentList } = useContext(UserContext)
  const { isAuthenticated, isLoading } = useAuth0();

  function handleClick(list) {
    setCurrentList(list)
    menuState.setMenuOpen(false)
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(isAuthenticated && currentUser.user_lists.length > 0){
    return (
      <ul className="saved-lists">
        {currentUser.user_lists.map((items, index) => 
          <li key={index} onClick={() => {handleClick(items)}}>{items.title}</li>)}
      </ul>
    )
  } else {
    return (
      <ul className="saved-lists"></ul>
    )
  }
}

export default SavedLists
