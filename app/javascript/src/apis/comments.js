import axios from "axios";

const create = (comment) => axios.post("/comment/", comment);

const commentsApi = {
  create,
};

export default commentsApi;
