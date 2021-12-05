import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from './services/user-context.js'
import LoginDataService from "./services/login";
import ListsDataService from "./services/lists"
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import CurrentList from './components/list/CurrentList'
import './styles/App.css';

function App() {
  // Correct viewport height on mobile
  useLayoutEffect(() => {
    const setMobileWindowHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setMobileWindowHeight()
    window.addEventListener('resize', setMobileWindowHeight);

    return function cleanupListener() {
      window.removeEventListener('resize', setMobileWindowHeight)
    }
  })

  // Set Initial User & List State
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState() 
  const [userLists, setUserLists] = useState()
  const [currentList, setCurrentList] = useState()

  useEffect(() => {
    // Get user from Server at login
    if(isAuthenticated){
      LoginDataService.loginValidation(user, setCurrentUser)
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    // Get Lists from user and server
    if(currentUser){
      ListsDataService.getUserLists(currentUser, setUserLists)
    }
  }, [currentUser])

  useEffect(() => {
    // Set Recent List
    if (!userLists) return

    if(userLists.length > 0){
      ListsDataService.filterRecentList(userLists, setCurrentList)
    } else {
      ListsDataService.createNewList(setCurrentList)
    }
  }, [userLists])

  useEffect(() => {
    // Create new list if no user
    if(isLoading) return

    if(!currentUser){
      ListsDataService.createNewList(setCurrentList)
    }
  }, [isLoading, currentUser])

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
      userLists: userLists,
      setUserLists: setUserLists
    }}>
      <Header menuState={menuState} />
      <Menu menuState={menuState} />
      <CurrentList currentList={currentList}/>
    </UserContext.Provider>
    </>
  );
}

export default App;
