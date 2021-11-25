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
  const createNewUser = () => {
    let date = new Date().toISOString()

    const initialUserState = {
      user_id: null,
      email: '',
      user_lists: [],
      date_created: date,
      date_updated: date,
    }

    setCurrentUser(initialUserState)
  }
  
  const [currentUser, setCurrentUser] = useState() 

  useEffect(() => {
    if(isAuthenticated){
      LoginDataService.loginValidation(user, currentUser, setCurrentUser)
    } else if (!currentUser){
      console.log('first user creation')
      createNewUser()
    }

  }, [isAuthenticated, user, currentUser, setCurrentUser])
  
  // Set Initial List State
  function createNewList() {
    let date = new Date().toISOString()
    let key = Math.random().toString(36).slice(2)

    let newList = {
      title: 'New List',
      list_id: key,
      shared: false,
      shared_users: [],
      list: [],
      date_created: date,
      date_updated: date,
    }

    setCurrentList(newList)
  }

  const [currentList, setCurrentList] = useState()
  let lists
  if (currentUser) {
    lists = currentUser.user_lists
  } else {
    lists = []
  }

  useEffect(() => {
    if(!isAuthenticated) createNewList()

    if(lists && lists.length > 0){
      let lastList = lists.reduce((a, b) => (a.date_updated > b.date_updated ? a : b)) || lists[0]
      setCurrentList(lastList)
    }
    console.log(currentUser)
  }, [lists, isAuthenticated])

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
      createNewList: createNewList
    }}>
      <Header menuState={menuState} />
      <Menu menuState={menuState} />
      <CurrentList currentList={currentList}/>
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
