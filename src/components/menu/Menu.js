import React, { useEffect, useState } from 'react'
import { Transition, animated } from 'react-spring'
import SavedLists from './SavedLists'
import UserHeader from './UserHeader'

const Menu = ({ menuState }) => {
	const [isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		function mobileCheck() {
			window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
		}
		mobileCheck();
		window.addEventListener("resize", mobileCheck);
		return function cleanupListener() {
			window.removeEventListener("resize", mobileCheck);
		};
	}, [isMobile]);

  if(isMobile){
    return (
      <Transition
          items={menuState.menuOpen}
        from={{ 
          opacity: 1,
          width: "0vw",
          height: '0%',
          overflow: 'hidden',
        }}
        enter={{ 
          opacity: 1,
          width: "100vw",
          height: '100%',
        }}
        leave={{ 
          opacity: 0,
          width: "0vw",
          height: '0%',
          overflow: 'hidden',
        }}
        reverse={menuState.menuOpen}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <animated.nav style={styles} className="app-menu">
            <UserHeader />
            <SavedLists menuState={menuState}/>
          </animated.nav>
        }
      </Transition>
    )
  } else {
    return (
      <Transition
          items={menuState.menuOpen}
        from={{ 
          opacity: 0,
          width: '0px',
          overflow: 'hidden',
        }}
        enter={{ 
          opacity: 1,
          width: '340px',
        }}
        leave={{ 
          opacity: 1,
          width: '0px',
          overflow: 'hidden',
        }}
        reverse={menuState.menuOpen}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <animated.nav style={styles} className="app-menu">
            <UserHeader />
            <SavedLists menuState={menuState}/>
          </animated.nav>
        }
      </Transition>
    )
  }
}

export default Menu
