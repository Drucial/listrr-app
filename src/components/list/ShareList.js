import React, { useContext, useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'
import ListsDataService from '../../services/lists'

const ShareList = ({ setShowModal, setModalMessage }) => {
  const { loginWithRedirect } = useAuth0();
  const { currentUser, setCurrentUser, currentList, userLists, setUserLists } = useContext(UserContext)

  let emailInputRef = useRef()

  function handleShare() {
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
        h3: 'Share this list?',
        p: "Enter the email of the person you want to share this list with",
        input: <div className="input-container" style={{ marginTop: '1.5rem', width: '100%'}}>
                  <input
                    ref={emailInputRef}
                    style={{ margin: 0, borderRadius: '3px', }}
                    className="list-input"
                    type="email"
                    name="share-email-input"
                    placeholder="Email"
                  />
                </div>,
        response: true,
        btn1: 'Share',
        btn1f: () => {validateInput(emailInputRef.current, emailInputRef.current.value)},
        btn2: 'Back',
        btn2f: () => setShowModal(false),
      }
    }

    setShowModal(true)
    setModalMessage(message)
  }

  const validateInput = (input, email) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      shareList(email)

    } else {
      input.placeholder = "Please enter a valid email address..."
      input.value = ""
    }
  }

  const shareList = (email) => {
    ListsDataService.shareList(email, currentList, currentUser, setCurrentUser,  userLists, setUserLists)
  }
  
  return (
    <div className="list-icon" onClick={handleShare}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
    </div>
  )
}

export default ShareList
