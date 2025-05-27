import api from "../lib/axios";

export const profilesApi = {
  getUserProfile: () => api.get(`/profile`),
};
