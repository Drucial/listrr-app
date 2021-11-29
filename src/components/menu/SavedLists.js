import React, { useContext } from 'react'
import SharedDataService from '../../services/sharedLists'
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'

const SavedLists = ({ menuState }) => {
  const { currentUser, setCurrentList, sharedLists, setSharedLists } = useContext(UserContext)
  const { isAuthenticated, isLoading } = useAuth0();

  let savedLists
  if(!currentUser) {
    savedLists = []
  }else if(currentUser && sharedLists){
    savedLists = [...currentUser.user_lists, ...sharedLists]
  } else {
    savedLists = [...currentUser.user_lists]
  }

  function handleClick(list) {
    if(list.shared_list){

      SharedDataService.getLists(currentUser.user_id)
      .then(response => {
        // console.log(response.data)
        setSharedLists(response.data)
      })
      .catch(e => {
        console.log(e)
      });

      let index = sharedLists.indexOf(list)
      let updatedList = sharedLists[index]

      setCurrentList(updatedList)
    } else {
      setCurrentList(list)
    }
    menuState.setMenuOpen(false)
  }

  const sharedIcon = 
    <span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="shared-icon"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </span>

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(isAuthenticated && savedLists.length > 0){
    return (
      <ul className="saved-lists">
        {savedLists.map((items, index) => 
        items.shared 
        ?
          <li key={index} onClick={() => {handleClick(items)}}>{items.title}{sharedIcon}</li>
        :
          <li key={index} onClick={() => {handleClick(items)}}>{items.title}</li>)
      }
      </ul>
    )
  } else {
    return (
      <ul className="saved-lists"></ul>
    )
  }
}

export default SavedLists
