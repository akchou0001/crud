import axios from "axios";

export default axios.create({
  baseURL: "https://testapi.webexcellis.in/",
  headers: {
    "Content-type": "application/json",
  },
});
