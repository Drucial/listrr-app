import React from 'react'

const MenuToggle = ({ menuState }) => {
  let cname = ""
  menuState.menuOpen === true ? cname = "open" : cname = ""
  
  return (
    <div id="menu" className={cname}></div>
  )
}

export default MenuToggle
