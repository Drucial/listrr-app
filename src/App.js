import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UserDataService from "./services/users";
import UserContext from './services/user-context.js'
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import CurrentList from './components/list/CurrentList'
import './styles/App.css';

function App() {
  const { user, isAuthenticated } = useAuth0()
  
  const initialUserState = {
    userID: null,
    userName: '',
    email: '',
    userLists: [],
    dateCreated: null,
    dateUpdated: null
  }
  
  const [currentUser, setCurrentUser] = useState(initialUserState)

  useEffect(() => {
    if(isAuthenticated){
      getUser(user.email)
    }
  }, [isAuthenticated, user])
  
  function getUser(userID){
    UserDataService.get(userID)
    .then(response => {
      setCurrentUser(response.data[0]);
    })
    .catch(e => {
      console.log(e)
    })
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const menuState = {
    menuOpen: menuOpen,
    setMenuOpen: setMenuOpen
  }
  
  const initialListState = {
    title: 'New List',
    list: []
  }

  const [currentList, setCurrentList] = useState(initialListState)

  return (
    <>
    <UserContext.Provider value={{ user: currentUser, currentList: currentList, setCurrentList: setCurrentList}}>
      <Header menuState={menuState} />
      <Menu menuState={menuState} />
      <CurrentList />
    </UserContext.Provider>
    </>
  );
}

export default App;
