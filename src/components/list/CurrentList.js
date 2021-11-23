import React from 'react';
import ListTitle from './ListTitle';
import ListInput from './ListInput'
import ListItems from './ListItems';
// import ListFooter from './ListFooter';

const CurrentList = () => {
  
  return (
    <main>
      <div className="current-list-container">
        <ListTitle />
        <ListInput />
        <ListItems />
        {/* <ListFooter /> */}
      </div>
    </main>
  )
}

export default CurrentList
