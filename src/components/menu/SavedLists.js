import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../services/user-context'
import { Transition, animated } from 'react-spring'

const SavedLists = ({ menuState }) => {
  const { userLists, setCurrentList } = useContext(UserContext)
  const { isLoading } = useAuth0();

  function handleClick(list) {
    setCurrentList(list)
    menuState.setMenuOpen(false)
  }

  const sharedIcon = 
    <span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="shared-icon"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </span>

  if (isLoading) {
    return <div className="saved-lists"><h2>Loading ...</h2></div>;
  }

  if(userLists){
    return (
      <ul className="saved-lists">
        <Transition
          items={userLists}
          from={{ 
            opacity: 0,
            height: 0,
            padding: 0,
            overflow: 'hidden',
          }}
          enter={{ 
            opacity: 1,
            height: 64,
            padding: 20,
          }}
          leave={{ 
            opacity: 0,
            height: 0,
            padding: 0,
            overflow: 'hidden',
          }}
          reverse={userLists}
          delay={200}
        >
        {(styles, item) =>
          item && item.shared ?
            <animated.li style={styles} onClick={() => {handleClick(item)}}>{item.title}{sharedIcon}</animated.li>
          :
            <animated.li style={styles} onClick={() => {handleClick(item)}}>{item.title}</animated.li>
        }
        </Transition>
      </ul>
    )
  } else {
    return (
      <ul className="saved-lists"></ul>
    )
  }
}

export default SavedLists
