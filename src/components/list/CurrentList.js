import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ListTitle from './ListTitle';
import ListInput from './ListInput'
import ListItems from './ListItems';
import Modal from './Modal';

const CurrentList = ({ currentList }) => {
  const { isLoading } = useAuth0();

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState()

  useEffect(() =>{
    let message = {
      h3: "Loading...",
      p: "Just grabbing your lists!",
      response: false,
    }
    
    setModalMessage(message)
    setShowModal(isLoading)
  }, [isLoading])
  

  return (
    <main>
      <Modal modalMessage={modalMessage} showModal={showModal} setShowModal={setShowModal}/>
      {!currentList ? <></> : 
        <div className="current-list-container">
          <ListTitle setShowModal={setShowModal} setModalMessage={setModalMessage}/>
          <ListInput />
          <ListItems />
        </div>
      }
    </main>
  )
}

export default CurrentList
