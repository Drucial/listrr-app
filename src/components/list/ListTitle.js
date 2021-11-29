import React, { useContext, useState, useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'
import UserDataService from '../../services/user'
import SharedDataService from '../../services/sharedLists'
import UpdateDataService from '../../services/save'
import TitleInput from './TitleInput'


const ListTitle = ({ setShowModal, setModalMessage }) => {
  const { loginWithRedirect } = useAuth0();

  const { currentUser, setCurrentUser, currentList, createNewList } = useContext(UserContext)
  const [showTitleInput, setShowTitleInput, ] = useState(false)
  const emailRef = useRef()

  let lists
  let props

  const message = (props) => {
    return(
      <>
        <h3>{props.h3}</h3>
        <p>{props.p}</p>
        {props.input}
        {props.response ? 
        <div className="modal-response">
          <button onClick={props.btn1f}>{props.btn1}</button>
          <button className="btn-outline" onClick={props.btn2f}>{props.btn2}</button>
        </div>
        : <></>
      }
      </>
    )
  }
    
  function editTitle() {
    setShowTitleInput(!showTitleInput)
  }

  function saveList() {
    if (!currentUser) return;
    if(currentList.shared){
      SharedDataService.updateList(currentList)
    } else {
      UpdateDataService.updateLists(currentUser, currentList, setCurrentUser)
    }

    showSuccess()
	}

  const showSuccess = () => {
    props = {
      h3: `Success!`,
      p: `${currentList.title} has been saved!`,
      response: false,
    }

    setShowModal(true)
    setModalMessage(message(props))
    
    setTimeout(() => {
      setShowModal(false)
    }, 1500)
  }

  function shareListPrompt() {
    if(!currentUser) {
      props = {
        h3: 'You must be logged in to share a list',
        p: "Would you like to create sign up or log in?",
        response: true,
        btn1: 'Sign Up',
        btn1f: () => loginWithRedirect(),
        btn2: 'Log In',
        btn2f: () => loginWithRedirect(),
      }
    } else {
      props = {
        h3: 'Share this list?',
        p: "Enter the email of the person you want to share this list with",
        input: <div className="input-container" style={{ marginTop: '1.5rem', width: '100%'}}>
                  <input
                    ref={emailRef}
                    style={{ margin: 0, borderRadius: '3px', }}
                    className="list-input"
                    type="text"
                    name="share-email-input"
                    placeholder="Email"
                  />
                </div>,
        response: true,
        btn1: 'Share',
        btn1f: () => {setShowModal(false); shareList(emailRef.current.value, currentList)},
        btn2: 'Back',
        btn2f: () => setShowModal(false),
      }
    }

    setShowModal(true)
    setModalMessage(message(props))
  }

  const shareList = (email, list) => {
    SharedDataService.shareList(email, list, currentUser, setCurrentUser)
  }

  function deletePrompt() {

    if(!currentUser) {
      props = {
        h3: 'You must be logged in to delete a list',
        p: "Would you like to create a new list or log in?",
        response: true,
        btn1: 'Create',
        btn1f: () => {createNewList(); setShowModal(false)},
        btn2: 'Log in',
        btn2f: () => loginWithRedirect(),
      }
    } else if(currentUser.user_lists.includes(currentList)) {
      props = {
        h3: 'Are you sure you want to delete this list?',
        p: "Please confirm",
        response: true,
        btn1: 'Yes',
        btn1f: deleteList,
        btn2: 'No',
        btn2f: () => setShowModal(false),
      }
    }

    setShowModal(true)
    setModalMessage(message(props))
  }

  function deleteList() {
    let date = new Date().toISOString()

    lists = currentUser.user_lists
    let index = lists.indexOf(currentList)
    lists.splice(index, 1)
    setCurrentUser({...currentUser, user_lists: lists, date_updated: date})

    UserDataService.updateLists(currentUser)
    .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

    createNewList()
    setShowModal(false)
  }

  return (
    <div className="list-header">
      <div className="title-container">
        <h1 id="listTitle" >{currentList.title}</h1>
        <div className="list-icons">
          <div className="list-icon" id="editIcon" onClick={editTitle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <div className="list-icon" onClick={saveList}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          </div>
          <div className="list-icon" onClick={shareListPrompt}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </div>
          <div className="list-icon" onClick={deletePrompt}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
          </div>
        </div>
      </div>
      <TitleInput showTitleInput={showTitleInput} setShowTitleInput={setShowTitleInput}/>
    </div>
  )
}

export default ListTitle
