import UserDataService from "./user";

class LoginDataService {

  loginValidation(user, setCurrentUser) {

    UserDataService.getUser(user.sub)
      .then(response => {
        
        if(response.data === "New user") {
          UserDataService.newUser(user)
        } else {
          setCurrentUser(response.data[0])
          // console.log(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}

export default new LoginDataService();