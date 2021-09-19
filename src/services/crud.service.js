import http from "../http-common";

class CrudDataService {
  get() {
    return http.get("/api/users");
  }

  create(data) {
    return http.post("/api/users/signUp", data);
  }

  update(id, data) {
    return http.put(`/api/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/users/${id}`);
  }
}

export default new CrudDataService();
