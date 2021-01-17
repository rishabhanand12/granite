import axios from "axios";
import { getAuthHeaders } from "./axios";

const list = async () =>
  await axios.get("/tasks", { headers: getAuthHeaders() });

const show = async (id) =>
  await axios.get(`/tasks/${id}`, { headers: getAuthHeaders() });

const create = async (payload) =>
  await axios.post("/tasks/", payload, { headers: getAuthHeaders() });

const update = async ({ id, payload }) =>
  await axios.put(`/tasks/${id}`, payload, { headers: getAuthHeaders() });

const destroy = async (id) =>
  await axios.delete(`/tasks/${id}`, { headers: getAuthHeaders() });

const tasksApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default tasksApi;
