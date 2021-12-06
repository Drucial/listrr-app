import SharedDataService from "./shared";
import UserDataService from './user'
import SharedListsService from './shared'

class ListsDataService {
// 
  getUserLists = (currentUser, setUserLists) => {
    SharedDataService.getLists(currentUser.user_id)
      .then(response => {
        let lists = [...currentUser.user_lists, ...response.data]
        setUserLists(lists)
      })
      .catch(e => {
        console.log(e)
      })
  }  
// 
  syncCurrentUserLists = (userLists, currentUser, setCurrentUser) => {
    const date = new Date().toISOString()
    let privateLists = userLists.filter(function(e) {
      return !e.shared
    })

    const updatedUser = {...currentUser, user_lists: privateLists, date_updated: date}
    setCurrentUser(updatedUser)

    UserDataService.updateLists(updatedUser)
  }
// 
  createNewList = (setCurrentList) => {
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
// 
  saveList = (currentList, userLists, setUserLists, currentUser, setCurrentUser) => {
    const date = new Date().toISOString()
    const list = {...currentList, date_updated: date}
    let updatedLists

    if(userLists.length > 0) {
      let filteredLists = userLists.filter(function(e) {
        return e.list_id !== list.list_id
      })
      updatedLists = [...filteredLists, list]
    } else {
      updatedLists = [list]
    }

    setUserLists(updatedLists)

    if(currentList.shared) {
      SharedDataService.updateList(currentList)
    } else {
      this.syncCurrentUserLists(updatedLists, currentUser, setCurrentUser)
    }
  }
// 
  deleteList = (currentList, userLists, setUserLists, currentUser, setCurrentUser) => {
    let filteredLists = userLists.filter(function(e) {
      return e.list_id !== currentList.list_id
    })

    setUserLists(filteredLists)
    this.syncCurrentUserLists(filteredLists, currentUser, setCurrentUser)
  }
// 
  removeSharedList = (currentList, currentUser, userLists, setUserLists) => {
    let filteredLists = userLists.filter(function(e) {
      return e.list_id !== currentList.list_id
    })

    setUserLists(filteredLists)
    
    if(currentList.shared_users.length > 1){
      // remove ID from shared list
      let filteredUsers = currentList.shared_users.filter(function(e) {
        return e !== currentUser.user_id
      })

      let date = new Date().toISOString()
      const updatedList = {...currentList, shared_users: filteredUsers, date_updated: date}
      SharedDataService.updateList(updatedList)
    } else {
      // Delete Shared List
      SharedListsService.deleteList(currentList.list_id)
    }
  }
// 
  shareList = (email, currentList, currentUser, setCurrentUser, userLists, setUserLists, setModalMessage) => {
    
    UserDataService.getSharedUser(email)
      .then(response => {
        validateUser(response.data)
      })
      .catch(e => {
        console.log(e)
      });
      
    const validateUser = (sharedUser) => {
      let message

      if(!sharedUser) {
        // this email message needs work see: https://zapier.com/app/editor/140273059
        let htmlList = []
        
        for(let item of currentList.list){
          htmlList.push(`<br />${item}`)
        }

        console.log(htmlList)
        let data = JSON.stringify({
          to: email,
          listTitle: currentList.title,
          list: htmlList,
          from: currentUser.name
        })

        SharedListsService.shareList(data)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            console.log(e)
          });

        message = {
          h3: `${email} isn't using Listrr!`,
          p: `We have emailed them a copy of your ${currentList.title} list though!`,
          btn0: 'Ok',
        }
        setModalMessage(message)
      } else if(currentList.shared_users.includes(sharedUser[0].user_id)) {
        message = {
          h3: 'whoops!',
          p: `${sharedUser[0].email} is already sharing this list`,
          btn0: 'Ok',
        }
        setModalMessage(message)
      } else {
        syncSharedLists(sharedUser[0])

        message = {
          h3: 'Success!',
          p: `We have shared your list with ${email}`,
          btn0: 'Ok',
        }
        setModalMessage(message)
      }
    }

    const syncSharedLists = (sharedUser) => {
      const date = new Date().toISOString()
      let list

      if(currentList.shared) {
        list = {
          ...currentList,
          shared_users: [...currentList.shared_users, sharedUser.user_id], 
          date_updated: date
        }
        SharedDataService.updateList(list)

      } else {
        list = {
          ...currentList, 
          shared: true, 
          shared_users: [currentUser.user_id, sharedUser.user_id], 
          date_updated: date
        }
        SharedDataService.newList(list)

      }

      let filteredLists = userLists.filter(function(e) {
        return e.list_id !== list.list_id
      })

      const updatedLists = [...filteredLists, list]
      
      setUserLists(updatedLists)
      this.syncCurrentUserLists(updatedLists, currentUser, setCurrentUser)
    }
  }
// 
  filterRecentList = (userLists, setCurrentList) => {
    if (userLists.length > 1){
      let lastList = userLists.reduce((a, b) => (a.date_updated > b.date_updated ? a : b))
      setCurrentList(lastList)
    } else {
      setCurrentList(userLists[0])
    }
  }
}

export default new ListsDataService()