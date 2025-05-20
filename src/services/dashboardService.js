import api from "../lib/axios";

export const dashboardApi = {
  getDashboardData: () => api.get(`/dashboard`),
};
