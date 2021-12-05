import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ListsDataService from '../../services/lists'
import UserContext from '../../services/user-context'

const DeleteList = ({ setShowModal, setModalMessage }) => {
  const { currentUser, setCurrentUser, currentList, setCurrentList, userLists, setUserLists } = useContext(UserContext)
  const { loginWithRedirect } = useAuth0();

  function handleNewList() {
		ListsDataService.createNewList(setCurrentList)
	}

  function handleDelete() {
      let message
  
      if(!currentUser) {
        message = {
          h3: 'You must be logged in to delete a list',
          p: "Would you like to create a new list or log in?",
          response: true,
          btn1: 'Create',
          btn1f: () => {handleNewList(); setShowModal(false)},
          btn2: 'Log in',
          btn2f: () => loginWithRedirect(),
        }
      } else if(currentList.shared){
        message = {
          h3: 'Looks like this is a shared list',
          p: "Are you sure you want to remove yourself from this list?",
          response: true,
          btn1: 'Yes',
          btn1f: () => handleDeleteRequest(),
          btn2: 'No',
          btn2f: () => setShowModal(false),
        }
      } else if(userLists.includes(currentList)) {
        message = {
          h3: 'Are you sure you want to delete this list?',
          p: "Please confirm",
          response: true,
          btn1: 'Yes',
          btn1f: () => handleDeleteRequest(),
          btn2: 'No',
          btn2f: () => setShowModal(false),
        }
      }
  
      setShowModal(true)
      setModalMessage(message)
    }
  
    function handleDeleteRequest() {
      if(currentList.shared){
        ListsDataService.removeSharedList(currentList, currentUser, userLists, setUserLists)
      } else {
        ListsDataService.deleteList(currentList, userLists, setUserLists, currentUser, setCurrentUser)
      }
  
      handleNewList()
      setShowModal(false)
    }

  return (
    <div className="list-icon" onClick={handleDelete}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
    </div>
  )
}

export default DeleteList
