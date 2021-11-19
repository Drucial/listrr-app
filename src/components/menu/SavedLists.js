import React, { useContext } from 'react'
import UserContext from '../../services/user-context'

const SavedLists = () => {
  const { user, setCurrentList } = useContext(UserContext)

  function handleClick(list) {
    setCurrentList(list)
  }
  return (
    <ul className="saved-lists">
      {user.user_lists.map((items, index) => 
        <li key={index} onClick={() => {handleClick(items)}}>{items.title}</li>)}
    </ul>
  )
}

export default SavedLists
