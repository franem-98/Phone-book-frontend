import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const http = {
  get: api.get,
  post: api.post,
  patch: api.patch,
  delete: api.delete,
};

export default http;
