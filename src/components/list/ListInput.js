import React, { useRef, useContext, useEffect } from 'react'
import UserContext from '../../services/user-context'

const ListInput = () => {
  const { currentList, setCurrentList } = useContext(UserContext)
  const listInputRef = useRef()

  // Enter Keydown Handler for Input Field
  useEffect(() => {
    if(!listInputRef) return
    let input = listInputRef.current

    input.addEventListener('keydown', handleKeyDown)

    return function cleanupListener() {
      input.removeEventListener('keydown',handleKeyDown)
    }
  })
    
  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      validateNewListItem()
    }
  }

  // Input Validation
  function validateNewListItem() {
    const input = listInputRef.current
    let inputValue = listInputRef.current.value
    let listArr = []
    let date = new Date().toISOString()

    if(currentList.list.length > 0) {
      for(let items of currentList.list){
        listArr.push(items.toLowerCase())
      }}

    if(!listInputRef){
      return
    } else if(inputValue === '') {

      input.placeholder = "Please enter a new list item"

    } else if(listArr.includes(inputValue.toLowerCase())) {

      input.placeholder = `Whoops! ${inputValue} is already on the list`
      listInputRef.current.value = ""

    } else {

      let item = inputValue
      let formattedList = []
      listArr.push(item)

        for(let listItem of listArr){
          let lowerItem = listItem.slice(1).toLowerCase()
           let capitalFirst = listItem.charAt(0).toUpperCase()
           formattedList.push(`${capitalFirst}${lowerItem}`)
        }

      
      setCurrentList({...currentList, list: formattedList, date_updated: date})
      input.placeholder = 'Enter new list item'
      listInputRef.current.value = ""
    }
  }

  return (
    <div className="input-container">
      <input
        ref={listInputRef}
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
