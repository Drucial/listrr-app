import UserDataService from "./user";

class LoginDataService {

  loginValidation(user, currentUser, setCurrentUser) {
    if(user){
      getUser(user.sub)
    } else if(!user || user.sub === currentUser.user_id){
      return;
    }

    function getUser(user_id){
      UserDataService.get(user_id)
  
      .then(response => {
        handleUserLogin(response.data)
      })
      .catch(e => {
        console.log(e)
      })
    }

    function handleUserLogin(data) {
      if(data === "New user") {
        UserDataService.newUser(user)
      } else if(currentUser.user_id !== data[0].user_id){
        setCurrentUser(data[0])
      } else {
        return
      }
    }
  }

}

export default new LoginDataService();