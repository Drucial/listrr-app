import React from 'react'
import { animated } from "react-spring";

const Modal = ({ modalMessage, style }) => {
  return (
    <animated.div style={style} className="modal-container">
      <div className="modal">
        {modalMessage}
      </div>
    </animated.div>
  )
}

export default Modal
