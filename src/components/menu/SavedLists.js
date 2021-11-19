import React from 'react'
import UserContext from '../../services/user-context'

const SavedLists = () => {
  // function handleClick(list) {
  //   // setActiveList(list)
  // }
  return (
    <ul className="saved-lists">
      <UserContext.Consumer>
      {user => (
        user.user_lists.map((items, index) => 
          <li key={index}>{items.title}</li>
        )
      )}
      </UserContext.Consumer>
    </ul>
  )
}

export default SavedLists
