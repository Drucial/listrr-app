import React, { useRef } from 'react'

const ListInput = () => {
  const inputRef = useRef()

  function validateNewListItem() {
    // const input = inputRef.current
    // let inputValue = input.value

    // if(!input) return

    // if(inputValue === '') {
    //   return
    // } else if(currentList.includes(inputValue)) {
    //   input.placeholder = `Whoops! ${inputValue} is already on the list`
    //   input.value = null
    // } else {
    //   setCurrentList([...currentList, inputValue])
    //   input.value = null
    // }
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
