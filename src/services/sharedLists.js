import http from "../http-common";
import UserDataService from './user'

class SharedDataService {

  shareList(email, list, user, setUser){
    // Check for user email in DB
    UserDataService.getUser(email)
      .then(response => {
        validateUser(response.data)
      })
      .catch(e => {
        console.log(e)
      });

    function validateUser(data){
      if(!data) return

      if (data ===  'No such user') {
        console.log('no user')
      } else {
        validateList(data[0].user_id)
      }
    }

    // Check for list in DB
    function validateList(userID) {
      if(list.shared_list) {

        if(list.shared_users.includes(userID)){
          console.log('this list is already shared with user')
        } else {
          console.log(`add ${userID} to shared_users`)
        }

      } else {
       createNewSharedList(userID)
      } 
    }

    // Create New list and update both users
    function createNewSharedList(userID) {
       // remove list from user_lists
       let date = new Date().toISOString()
       let lists = user.user_lists
       let index = lists.indexOf(list)
       lists.splice(index, 1)

       // Update Current User
       setUser({...user, user_lists: lists, date_updated: date})

        UserDataService.updateLists(user)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

       // add list to sharedLists database with user id and shared email id
       let sharedUsers = [user.user_id, userID]
       newList(list, sharedUsers)
    }

    function newList(data, sharedUsers) {
      let newList = {
        title: data.title,
        list_id: data.list_id,
        shared: true,
        shared_users: sharedUsers,
        list: data.list,
        date_created: data.date_created,
        date_updated: new Date().toISOString(),
      }
      return http.post("/post_shared_list", newList)
    }
  }


  updateList(data) {
    return http.put("/update_shared_list", data);
  }

  getLists(userID) {
    return http.get(`/shared_lists?user_id=${userID}`);
  }

}

export default new SharedDataService();