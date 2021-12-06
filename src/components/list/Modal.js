import { Transition, animated } from "react-spring";

const Modal = ({ modalMessage, showModal, setShowModal }) => {

  const message = (modalMessage) => {
    return (
      <div className="modal">
        <h3>{modalMessage.h3}</h3>
        <p>{modalMessage.p}</p>
        {modalMessage.input}
        {modalMessage.btn0 
          ? <div className="modal-response">
              <button onClick={() => setShowModal(false)}>{modalMessage.btn0}</button>
            </div>
          : <></>
        }
        {modalMessage.response  
          ? <div className="modal-response">
              <button onClick={modalMessage.btn1f}>{modalMessage.btn1}</button>
              <button className="btn-outline" onClick={modalMessage.btn2f}>{modalMessage.btn2}</button>
            </div>
          : <></>
        }
      </div>
    )
  }

  return (
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
      >
      {(styles, item) =>
        item && 
        <animated.div style={styles} className="modal-container">
            {message(modalMessage)}
        </animated.div>
      }
    </Transition>
  )
}

export default Modal
