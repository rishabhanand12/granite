import axios from "axios";
// import { getAuthHeaders } from "./axios";

const list = async () => await axios.get("/tasks");

const show = async (id) => await axios.get(`/tasks/${id}`);

const create = async (payload) => await axios.post("/tasks/", payload);

const update = async ({ id, payload }) =>
  await axios.put(`/tasks/${id}`, payload);

const destroy = async (id) => await axios.delete(`/tasks/${id}`);

const tasksApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default tasksApi;
