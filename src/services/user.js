import http from "../http-common";

class UserDataService {

  // Get Shared User
  getUser(email) {
    return http.get(`/user_share?email=${email}`);
  }

  get(id) {
    return http.get(`/user?user_id=${id}`);
  }

  newUser(data) {
    let newUser = {
      user_id: data.sub,
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      date_updated: data.updated_at,
      picture: data.picture,
      user_lists: [],
    };
    return http.post("/create_user", newUser)
  }

  updateLists(data) {
    return http.put("/update_lists", data);
  }

}

export default new UserDataService();
