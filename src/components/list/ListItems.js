import React, { useContext } from 'react'
import { Transition, animated } from 'react-spring'
import UserContext from '../../services/user-context'
import ListsDataService from '../../services/lists'

const ListItems = () => {
  const { currentList, setCurrentList, userLists, setUserLists, currentUser, setCurrentUser } = useContext(UserContext)
  let list = currentList.list

  function handleClick(item) {
    let date = new Date().toISOString()
    let filteredList = list.filter(function(e) {
      return e !== item
    })
  
    const updatedList = {...currentList, list: filteredList, date_updated: date}
    setCurrentList(updatedList)

    ListsDataService.saveList(updatedList, userLists, setUserLists, currentUser, setCurrentUser)
  }

  return (
    <ul className="active-list">
      <Transition
        items={list}
        from={{ 
          opacity: 0,
          height: 0,
          padding: 0,
          marginBottom: 0,
          overflow: 'hidden',
        }}
        enter={{ 
          opacity: 1,
          height: 64,
          padding: 20,
          marginBottom: 10
        }}
        leave={{ 
          opacity: 0,
          height: 0,
          padding: 0,
          marginBottom: 0,
          overflow: 'hidden',
        }}
        reverse={list}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <animated.li className="list-item" style={styles} onClick={() => {handleClick(item)}}>{item}</animated.li>
        }
      </Transition>
      {/* )} */}
    </ul>
  )
}

export default ListItems
