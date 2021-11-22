import React, { useRef, useContext } from 'react'
import UserContext from '../../services/user-context'

const ListInput = () => {
  const { currentList, setCurrentList } = useContext(UserContext)
  const inputRef = useRef()

  // Needs Enter Key Listener

  function validateNewListItem() {
    const input = inputRef.current
    let inputValue = inputRef.current.value
    let list = currentList.list
    let date = new Date().toISOString()

    if(!input){
      return
    } else if(inputValue === '') {
      return
    } else if(currentList.list.includes(inputValue)) {
      input.placeholder = `Whoops! ${inputValue} is already on the list`
      input.value = null
    } else {
      list.push(inputValue)
      setCurrentList({...currentList, list: list, date_updated: date})
      input.placeholder = 'Enter new list item'
      input.value = null
    }
  }

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        className="list-input"
        type="text"
        name="new-list-item"
        placeholder="Enter new list item"
      />
      <button id="submit" onClick={validateNewListItem}>Add</button>
    </div>
  )
}

export default ListInput
