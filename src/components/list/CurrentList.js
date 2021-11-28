import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Transition } from "react-spring";
import ListTitle from './ListTitle';
import ListInput from './ListInput'
import ListItems from './ListItems';
import Modal from './Modal';

const CurrentList = ({ currentList }) => {
  const { isLoading } = useAuth0();

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState()

  let loading = <><h3>Loading...</h3><p>Just grabbing your lists!</p></>

  return (
    <main>
      <Transition
        items={isLoading}
        from={{ 
          opacity: 0
        }}
        enter={{ 
          opacity: 1
        }}
        leave={{ 
          opacity: 0
        }}
        reverse={isLoading}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <Modal style={styles} modalMessage={loading}/>
        }
      </Transition>
      {!currentList ? <></> : 
      <>
        <Transition
          items={showModal}
          from={{ 
            opacity: 0
          }}
          enter={{ 
            opacity: 1
          }}
          leave={{ 
            opacity: 0
          }}
          reverse={showModal}
          delay={200}
          >
          {(styles, item) =>
            item && 
              <Modal style={styles} modalMessage={modalMessage}/>
          }
        </Transition>
        <div className="current-list-container">
          <ListTitle setShowModal={setShowModal} setModalMessage={setModalMessage}/>
          <ListInput />
          <ListItems />
        </div>
      </>
      }
    </main>
  )
}

export default CurrentList
