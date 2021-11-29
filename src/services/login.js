import UserDataService from "./user";
import SharedDataService from "./sharedLists"

class LoginDataService {

  loginValidation(user, setCurrentUser, setSharedLists) {
    if(!user) return;

    UserDataService.get(user.sub)
      .then(response => {
        handleUserLogin(response.data)
      })
      .catch(e => {
        console.log(e)
      })


    SharedDataService.getLists(user.sub)
      .then(response => {
        // console.log(response.data)
        setSharedLists(response.data)
      })
      .catch(e => {
        console.log(e)
      })


    const handleUserLogin = (data) => {
      if (!data) return

      if(data === "New user") {UserDataService.newUser(user)} 
      let userData = data[0]
      
      setCurrentUser(userData)
    }
  }
}

export default new LoginDataService();