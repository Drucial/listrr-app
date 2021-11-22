import React, { useContext } from 'react'
import UserContext from '../../services/user-context'
import UpdateDataService from "../../services/save";

const ListFooter = () => {
  const { currentUser, currentList, setCurrentUser } = useContext(UserContext)

  function handleClick() {
    UpdateDataService.updateLists(currentUser, currentList, setCurrentUser)
  }

  return (
    <footer>
      <button onClick={handleClick}>Save</button>
    </footer>
  )
}

export default ListFooter
