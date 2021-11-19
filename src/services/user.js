import http from "../http-common";

class UserDataService {

  get(id) {
    return http.get(`/user?email=${id}`);
  }

  updateUser(data) {
    return http.put("/update-user", data);
  }

}

export default new UserDataService();
