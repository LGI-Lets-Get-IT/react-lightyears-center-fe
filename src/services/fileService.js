import api from "../lib/axios";

export const filesApi = {
  uploadFile: (requestBody) => api.post("/files", requestBody),
  getAllFiles: () => api.get("/files"),
  deleteFile: (requestBody) => api.delete(`/files`, { data: requestBody }),
};
