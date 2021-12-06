import http from "../http-common";
import axios from 'axios'

class SharedListsService {

  updateList(list) {
    return http.put("/update_shared_list", list);
  }

  getLists(userID) {
    return http.get(`/shared_lists?user_id=${userID}`);
  }

  deleteList(id) {
    return http.delete(`/delete_shared_list?list_id=${id}`);
  }

  newList(list) {
    return http.post("/post_shared_list", list)
  }
  shareList(data) {
    return axios.post("https://hooks.zapier.com/hooks/catch/11008323/bmzz9p1/", data)
  }

}

export default new SharedListsService();