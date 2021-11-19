import React from 'react'

const MenuToggle = (open) => {
  let cname = ""
  open.open === true ? cname = "open" : cname = ""
  
  return (
    <div id="menu" className={cname}></div>
  )
}

export default MenuToggle
