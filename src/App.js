import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from './services/user-context.js'
import LoginDataService from "./services/login";
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import CurrentList from './components/list/CurrentList'
import './styles/App.css';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Set Initial User State
  const [currentUser, setCurrentUser] = useState() 

  useEffect(() => {
    if(isAuthenticated){
      LoginDataService.loginValidation(user, setCurrentUser)
    }
  }, [isAuthenticated, user])
  
//   // Set Initial List State / Create New List
  const createNewList = () => {
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

  // Sync Lists and Most Recent List
  let lists
  let lastList
    
  if(currentUser) {
    lists = currentUser.user_lists

    if(lists.length === 1){
      lastList = currentUser.user_lists[0]
    } else if(lists.length > 1){
      lastList = lists.reduce((a, b) => (a.date_updated > b.date_updated ? a : b))
    }
  }

  useEffect(() => {
    // Handle first list on log in
    if(isLoading) return;

    if(isAuthenticated) {
      
      if(lists && lists.length > 0){
        setCurrentList(lastList)
      } else {
        createNewList()
      }
    } else {
      createNewList()
    }

  }, [isLoading, isAuthenticated, lists, lastList])

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
