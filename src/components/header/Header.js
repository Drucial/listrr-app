import React from 'react'
import Nav from './Nav'
import Logo from './Logo'

const Header = ({ menuState }) => {
  return (
    <header className="app-header">
      <Logo />
      <Nav menuState={menuState}/>
    </header>
  )
}

export default Header

