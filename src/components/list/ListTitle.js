import React from 'react'
import EditIcon from './EditIcon';
import TitleInput from './TitleInput'

const ListTitle = () => {

  return (
    <div className="list-header">
      <div className="title-container">
        <h1 id="listTitle" >New List</h1>
        <EditIcon />
      </div>
      <TitleInput />
    </div>
  )
}

export default ListTitle
