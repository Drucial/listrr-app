import React, { useContext, useState } from 'react'
import UserContext from '../../services/user-context'
import UserDataService from '../../services/user'
import UpdateDataService from '../../services/save'
import TitleInput from './TitleInput'


const ListTitle = () => {
  const { currentUser, setCurrentUser, currentList, setCurrentList, initialListState } = useContext(UserContext)
  const [showTitleInput, setShowTitleInput, ] = useState(false)

  function editTitle() {
    setShowTitleInput(!showTitleInput)
  }

  function saveList() {
		UpdateDataService.updateLists(currentUser, currentList, setCurrentUser)
	}

  function shareList() {
    console.log('share this list')
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
          <div className="list-icon" id="editIcon" onClick={editTitle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.83 467">
              <g>
                <path d="M279.46,36H107A17,17,0,0,0,90,53V451a17,17,0,0,0,17,17H397a17,17,0,0,0,17-17V170.54a17,17,0,0,0-5-12L291.48,41A17,17,0,0,0,279.46,36Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
                <path d="M288,47.74V145a17,17,0,0,0,17,17h97.26a4.45,4.45,0,0,0,3.15-7.59L295.59,44.59A4.45,4.45,0,0,0,288,47.74Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
              </g>
              <path d="M200.1,363.07l-1.45,43.79c-.16,4.61,5.72,8.7,10,7l40.58-16.54a4.36,4.36,0,0,0,1.93-1.52L468.08,84.35c1.66-2.38.5-6-2.59-8.2L426.37,48.9c-3.08-2.15-6.93-2-8.59.42L200.85,360.73A4.36,4.36,0,0,0,200.1,363.07Z" transform="translate(-72.5 -18.5)" fill=""  stroke-miterlimit="10" stroke-width="35"/>
            </svg>
          </div>
          <div className="list-icon" onClick={saveList}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 359 467">
              <g>
                <path d="M279.46,36H107A17,17,0,0,0,90,53V451a17,17,0,0,0,17,17H397a17,17,0,0,0,17-17V170.54a17,17,0,0,0-5-12L291.48,41A17,17,0,0,0,279.46,36Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
                <path d="M288,47.74V145a17,17,0,0,0,17,17h97.26a4.45,4.45,0,0,0,3.15-7.59L295.59,44.59A4.45,4.45,0,0,0,288,47.74Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
              </g>
              <g>
                <path d="M126.53,225.78V406.67a17.76,17.76,0,0,0,17.5,17.5H360a17.76,17.76,0,0,0,17.5-17.5V225.78a17.76,17.76,0,0,0-17.5-17.5H253a17.76,17.76,0,0,0-17.5,17.5v118.5c0,9.15,8.05,17.92,17.5,17.5s17.5-7.69,17.5-17.5V225.78L253,243.28H360l-17.5-17.5V406.67l17.5-17.5H144l17.5,17.5V225.78c0-9.16-8.05-17.93-17.5-17.5s-17.5,7.69-17.5,17.5Z" transform="translate(-72.5 -18.5)"/>
                <path d="M302.13,267.85l-54.3,63-7.7,9h24.74l-55.05-62.92-7.95-9.08c-6-6.91-18.64-6.65-24.74,0-6.77,7.37-6.46,17.37,0,24.75l55.05,62.91,7.95,9.09c5.9,6.75,18.87,6.82,24.74,0l54.3-63.06,7.7-8.94c6-6.93,7.32-18,0-24.75-6.55-6-18.37-7.41-24.74,0Z" transform="translate(-72.5 -18.5)"/>
              </g>
            </svg>
          </div>
          <div className="list-icon" onClick={shareList}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 359 467">
              <g>
                <path d="M279.46,36H107A17,17,0,0,0,90,53V451a17,17,0,0,0,17,17H397a17,17,0,0,0,17-17V170.54a17,17,0,0,0-5-12L291.48,41A17,17,0,0,0,279.46,36Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
                <path d="M288,47.74V145a17,17,0,0,0,17,17h97.26a4.45,4.45,0,0,0,3.15-7.59L295.59,44.59A4.45,4.45,0,0,0,288,47.74Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
              </g>
              <g>
                <path d="M342.5,342l0,64.67,17.5-17.5H144l17.5,17.5V225.78L144,243.28l78.62.19,11.35,0c9.15,0,17.92-8.07,17.5-17.5s-7.69-17.48-17.5-17.5l-78.62-.19-11.35,0a17.74,17.74,0,0,0-17.5,17.5V406.67a17.76,17.76,0,0,0,17.5,17.5H360a17.76,17.76,0,0,0,17.5-17.5l0-64.67c0-9.15-8.05-17.92-17.5-17.5s-17.5,7.69-17.5,17.5Z" transform="translate(-72.5 -18.5)"/>
                <path d="M288,243.5h72L342.5,226v63c0,9.15,8.05,17.92,17.5,17.5s17.5-7.69,17.5-17.5V226A17.76,17.76,0,0,0,360,208.5H288c-9.15,0-17.92,8.05-17.5,17.5s7.69,17.5,17.5,17.5Z" transform="translate(-72.5 -18.5)"/>
                <path d="M264.37,338.37l94.43-87.43,13.57-12.57c6.74-6.23,6.79-18.52,0-24.74a17.85,17.85,0,0,0-24.74,0L253.2,301.06l-13.57,12.57c-6.74,6.23-6.79,18.52,0,24.74a17.85,17.85,0,0,0,24.74,0Z" transform="translate(-72.5 -18.5)"/>
              </g>
            </svg>
          </div>
          <div className="list-icon" onClick={deleteList}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 359 467">
              <g>
                <path d="M279.46,36H107A17,17,0,0,0,90,53V451a17,17,0,0,0,17,17H397a17,17,0,0,0,17-17V170.54a17,17,0,0,0-5-12L291.48,41A17,17,0,0,0,279.46,36Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
                <path d="M288,47.74V145a17,17,0,0,0,17,17h97.26a4.45,4.45,0,0,0,3.15-7.59L295.59,44.59A4.45,4.45,0,0,0,288,47.74Z" transform="translate(-72.5 -18.5)" fill="none"  stroke-miterlimit="10" stroke-width="35"/>
              </g>
              <g>
                <path d="M150.63,238.37l60.15,60.16,95.87,95.87,22,22c6.48,6.49,18.35,7,24.74,0s6.92-17.83,0-24.74l-60.15-60.16L197.35,235.6l-22-22c-6.48-6.49-18.35-7-24.74,0s-6.92,17.83,0,24.74Z" transform="translate(-72.5 -18.5)"/>
                <path d="M328.63,213.63l-60.16,60.15L172.6,369.65l-22,22c-6.49,6.48-7,18.35,0,24.74s17.83,6.92,24.74,0l60.16-60.15,95.87-95.87,22-22c6.49-6.48,7-18.35,0-24.74s-17.83-6.92-24.74,0Z" transform="translate(-72.5 -18.5)"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <TitleInput showTitleInput={showTitleInput} setShowTitleInput={setShowTitleInput}/>
    </div>
  )
}

export default ListTitle
