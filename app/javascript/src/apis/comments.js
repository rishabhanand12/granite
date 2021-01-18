import axios from "axios";

const create = async (comment) => await axios.post("/comments/", comment);

const commentsApi = {
  create,
};

export default commentsApi;
