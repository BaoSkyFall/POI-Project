import axios from "../ultis/axios/axios";

function login(email, password) {
  return axios.post("/login", {
    email,
    password,
  });
}

function verify() {
  return axios.get("/users/", {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
}

export { login, verify };
