import api from "../lib/axios";

export const filesApi = {
  uploadFile: (requestBody) => api.post("/files", requestBody),
  getAllFiles: (query) => api.get("/files", query),
  deleteFile: (requestBody) => api.delete(`/files`, { data: requestBody }),
};
