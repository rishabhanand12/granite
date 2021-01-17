import axios from "axios";

const login = async (payload) => await axios.post("/sessions", payload);

const signup = async (payload) => await axios.post("/users", payload);

const authApi = {
  login,
  signup,
};

export default authApi;
