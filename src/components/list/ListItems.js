import React, { useContext } from 'react'
import UserContext from '../../services/user-context'

const ListItems = () => {
  const { currentList, setCurrentList } = useContext(UserContext)

  function handleClick(items) {
    let list = currentList.list
    let index = list.indexOf(items)
  
    list.splice(index, 1)
    setCurrentList({...currentList, list: list})
    console.log(currentList)
  }

  

  return (
    <ul className="active-list">
      {currentList.list.map((items, index) =>
      <li className="list-item" key={index} onClick={() => {handleClick(items)}}>{items}</li>
      )}
    </ul>
  )
}

export default ListItems
