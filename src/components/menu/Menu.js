import React from 'react'
import { Transition, animated } from 'react-spring'
import SavedLists from './SavedLists'
import UserHeader from './MenuHeader'

const Menu = ({ menuState }) => {
  return (
    <Transition
        items={menuState.menuOpen}
        from={{ 
          opacity: 0,
          width: 0,
          overflow: 'hidden',
        }}
        enter={{ 
          opacity: 1,
          width: 300,
        }}
        leave={{ 
          opacity: 0,
          width: 0,
          overflow: 'hidden',
        }}
        reverse={menuState.menuOpen}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <animated.nav style={styles}className="app-menu">
            <UserHeader />
            <SavedLists />
          </animated.nav>
        }
      </Transition>
  )
}

export default Menu
