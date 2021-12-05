import React, { useContext, useState } from 'react'
import UserContext from '../../services/user-context'
import TitleInput from './TitleInput'
import SaveList from './SaveList'
import ShareList from './ShareList'
import DeleteList from './DeleteList'


const ListTitle = ({ setShowModal, setModalMessage }) => {
  const { currentList } = useContext(UserContext)
  const [showTitleInput, setShowTitleInput] = useState(false)

  function editTitleToggle() {
    setShowTitleInput(!showTitleInput)
  }

  return (
    <div className="list-header">
      <div className="title-container">
        <h1 id="listTitle" >{currentList.title}</h1>
        <div className="list-icons">
          <div className="list-icon" id="editIcon" onClick={editTitleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <SaveList setShowModal={setShowModal} setModalMessage={setModalMessage}/>
          <ShareList setShowModal={setShowModal} setModalMessage={setModalMessage}/>
          <DeleteList setShowModal={setShowModal} setModalMessage={setModalMessage}/>
        </div>
      </div>
      <TitleInput showTitleInput={showTitleInput} setShowTitleInput={setShowTitleInput}/>
    </div>
  )
}

export default ListTitle
