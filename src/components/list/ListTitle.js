import React, { useContext, useState } from 'react'
import UserContext from '../../services/user-context'
import TitleInput from './TitleInput'
import UserDataService from '../../services/user'

const ListTitle = () => {
  const { setCurrentList, currentList, setCurrentUser, currentUser, initialListState } = useContext(UserContext)
  const [showTitleInput, setShowTitleInput] = useState(false)

  function editTitle() {
    setShowTitleInput(!showTitleInput)
  }

  function deleteList() {
    let lists = currentUser.user_lists;
    let date = new Date().toISOString()

    if(lists.includes(currentList)) {
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

      setCurrentList(initialListState)
    } else {
      console.log('no lists')
    }
  }

  return (
    <div className="list-header">
      <div className="title-container">
        <h1 id="listTitle" >{currentList.title}</h1>
        <div className="list-icons">
          <div id="editIcon" onClick={editTitle}>
            <svg
              aria-hidden="true"
              focusable="true"
              data-prefix="far"
              data-icon="edit"
              className="svg-edit"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
              ></path>
            </svg>
          </div>
          <div id="shareIcon">
          <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="far" 
            data-icon="share-square" 
            className="svg-share" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 576 512"
          >
            <path 
              fill="currentColor" 
              d="M561.938 158.06L417.94 14.092C387.926-15.922 336 5.097 336 48.032v57.198c-42.45 1.88-84.03 6.55-120.76 17.99-35.17 10.95-63.07 27.58-82.91 49.42C108.22 199.2 96 232.6 96 271.94c0 61.697 33.178 112.455 84.87 144.76 37.546 23.508 85.248-12.651 71.02-55.74-15.515-47.119-17.156-70.923 84.11-78.76V336c0 42.993 51.968 63.913 81.94 33.94l143.998-144c18.75-18.74 18.75-49.14 0-67.88zM384 336V232.16C255.309 234.082 166.492 255.35 206.31 376 176.79 357.55 144 324.08 144 271.94c0-109.334 129.14-118.947 240-119.85V48l144 144-144 144zm24.74 84.493a82.658 82.658 0 0 0 20.974-9.303c7.976-4.952 18.286.826 18.286 10.214V464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h132c6.627 0 12 5.373 12 12v4.486c0 4.917-2.987 9.369-7.569 11.152-13.702 5.331-26.396 11.537-38.05 18.585a12.138 12.138 0 0 1-6.28 1.777H54a6 6 0 0 0-6 6v340a6 6 0 0 0 6 6h340a6 6 0 0 0 6-6v-25.966c0-5.37 3.579-10.059 8.74-11.541z"
            ></path>
          </svg>
          </div>
          <div id="trashIcon" onClick={deleteList}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="trash-alt"
              className="svg-trash"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <TitleInput showTitleInput={showTitleInput} setShowTitleInput={setShowTitleInput}/>
    </div>
  )
}

export default ListTitle
