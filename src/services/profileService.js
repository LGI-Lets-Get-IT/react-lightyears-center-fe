import api from "../lib/axios";

export const profilesApi = {
  getUserProfile: () => api.get(`/profile`),
  updateUserProfile: (requestBody) => api.put("/profile", requestBody),
};
