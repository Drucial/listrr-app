import React, { useContext } from 'react'
import UserContext from '../../services/user-context'
import { Transition, animated } from 'react-spring'

const ListItems = () => {
  const { currentList, setCurrentList } = useContext(UserContext)
  const list = currentList.list

  function handleClick(items) {
    let list = currentList.list
    let index = list.indexOf(items)
    let date = new Date().toISOString()
  
    list.splice(index, 1)
    setCurrentList({...currentList, list: list, date_updated: date})
  }

  return (
    <ul className="active-list">
      {/* {currentList.list.map((items, index) => */}
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
