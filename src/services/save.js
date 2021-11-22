import UserDataService from "./user";

class UpdateDataService {

  updateLists(currentUser, currentList, setCurrentUser) {
    let lists = currentUser.user_lists
    let listIds = []

    if(lists.length > 0) {
      for(let list of lists) listIds.push(list.list_id)
    }

    if(listIds.includes(currentList.list_id)) {
      updateExistingList()
    } else {
      createNewList()
    }

    function updateExistingList() {
      
      let index = listIds.indexOf(currentList.list_id)
      lists.splice(index, 1, currentList)

      const userUpdate = { ...currentUser, user_lists: lists }
      setCurrentUser(userUpdate)

      UserDataService.updateLists(currentUser)
      .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    function createNewList() {
      
      lists.push(currentList)
      const userUpdate = { ...currentUser, user_lists: lists }
      setCurrentUser(userUpdate)

      UserDataService.updateLists(currentUser)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

}

export default new UpdateDataService();