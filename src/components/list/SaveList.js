import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ListsDataService from '../../services/lists'
import UserContext from '../../services/user-context'

const SaveList = ({ setShowModal, setModalMessage }) => {
  const { loginWithRedirect } = useAuth0();
  const { currentUser, setCurrentUser, currentList, userLists, setUserLists } = useContext(UserContext)
  
  function handleSave() {
    let message

    if(!currentUser) {
      message = {
        h3: 'You must be logged in to share a list',
        p: "Would you like to create sign up or log in?",
        response: true,
        btn1: 'Sign Up',
        btn1f: () => loginWithRedirect(),
        btn2: 'Log In',
        btn2f: () => loginWithRedirect(),
      }
    } else {
      message = {
        h3: `Success!`,
        p: `${currentList.title} has been saved!`,
        response: false,
      }

      setTimeout(() => {
        setShowModal(false)
      }, 1500)
    };

    ListsDataService.saveList(currentList, userLists, setUserLists, currentUser, setCurrentUser)

    setShowModal(true)
    setModalMessage(message)
	}

  return (
    <div className="list-icon" onClick={handleSave}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
    </div>
  )
}

export default SaveList
