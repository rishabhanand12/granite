import axios from "axios";

const list = async () => await axios.get("/users");

const usersApi = {
  list,
};

export default usersApi;
