import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from './services/user-context.js'
import LoginDataService from "./services/login";
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import CurrentList from './components/list/CurrentList'
import './styles/App.css';

function App() {
  const { user, isAuthenticated } = useAuth0();

  // Set Initial User State
  const initialUserState = {
    user_id: null,
    email: '',
    user_lists: [],
    date_created: new Date().toISOString(),
    date_updated: new Date().toISOString(),
  }
  
  const [currentUser, setCurrentUser] = useState(initialUserState) 

  useEffect(() => {
    if(!isAuthenticated) return
    LoginDataService.loginValidation(user, currentUser, setCurrentUser)
  }, [isAuthenticated, user, currentUser, setCurrentUser])
  
  // Set Initial List State
  const initialListState = {
    title: 'New List',
    list_id: idGen(),
    shared: false,
    shared_users: [],
    list: [],
    date_created: new Date().toISOString(),
    date_updated: new Date().toISOString(),
  }

  function idGen() {
    return Math.random().toString(36).slice(2)
  }

  const [currentList, setCurrentList] = useState(initialListState)

  // Menu Functionality (toggle)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuState = {
    menuOpen: menuOpen,
    setMenuOpen: setMenuOpen
  }


  return (
    <>
    <UserContext.Provider value={{ 
      currentUser: currentUser,
      setCurrentUser: setCurrentUser, 
      currentList: currentList, 
      setCurrentList: setCurrentList, 
      initialListState: initialListState 
    }}>
      <Header menuState={menuState} />
      <Menu menuState={menuState} />
      <CurrentList />
    </UserContext.Provider>
    </>
  );
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

export default App;
