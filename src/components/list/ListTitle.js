import React, { useContext, useState } from 'react'
import UserContext from '../../services/user-context'
import UserDataService from '../../services/user'
import UpdateDataService from '../../services/save'
import TitleInput from './TitleInput'


const ListTitle = ({ setShowModal, setModalMessage }) => {
  const { currentUser, setCurrentUser, currentList, createNewList } = useContext(UserContext)
  const [showTitleInput, setShowTitleInput, ] = useState(false)
  let lists = currentUser.user_lists;
  let message
    
  function editTitle() {
    setShowTitleInput(!showTitleInput)
  }

  function saveList() {
		UpdateDataService.updateLists(currentUser, currentList, setCurrentUser)
	}

  function shareList() {
    console.log('share this list')
  }

  function deletePrompt() {
    if(lists.includes(currentList))
    
    message = 
      <>
        <h3>Are you sure you want to delete this list?</h3>
        <div className="modal-response">
          <button onClick={deleteList}>Yes</button>
          <button onClick={() => setShowModal(false)}>No</button>
        </div>
      </>

    setShowModal(true)
    setModalMessage(message)
  }

  function deleteList() {
    let date = new Date().toISOString()

    setShowModal(false)

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
          <div className="list-icon" onClick={shareList}>
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
