import React, { useContext } from 'react'
import UserContext from '../../services/user-context'

const ListItems = () => {
 
  const { currentList } = useContext(UserContext)

  return (
    <ul className="active-list">
      {currentList.list.map((items, index) =>
      <li className="list-item" key={index}>{items}</li>
      )}
    </ul>
  )
}

export default ListItems
