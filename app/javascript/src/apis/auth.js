import axios from "axios";

const login = async (payload) => await axios.post("/sessions", payload);

const signup = async (payload) => await axios.post("/users", payload);

const logout = async() => await axios.delete("/sessions")

const authApi = {
  login,
  signup,
  logout
};

export default authApi;
