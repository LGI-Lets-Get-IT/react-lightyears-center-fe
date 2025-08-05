import api from "../lib/axios";

export const picSchedulesApi = {
  createPicSchedule: (requestBody) => api.post("/pic-schedules", requestBody),
  getAllPicSchedules: () => api.get("/pic-schedules"),
  getPicScheduleByEmployeeId: (id) => api.get(`/pic-schedules/${id}`),
  updatePicScheduleByEmployeeId: (id, requestBody) =>
    api.put(`/pic-schedules/${id}`, requestBody),
  deletePicScheduleByIds: (requestBody) =>
    api.delete(`/pic-schedules`, { data: requestBody }),
};
