import http from "../http-common";

class UsersDataService {

  get(id) {
    return http.get(`/users?userID=${id}`);
  }

  createUser() {
    return http.post()
  }

  find(query, by = "userEmail") {
    return http.get(`users?${by}=${query}`);
  } 

}

export default new UsersDataService();