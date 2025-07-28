import api from "../lib/axios";

export const picSchedulesApi = {
    createPicSchedule: (requestBody) => api.post('/pic-schedules', requestBody),
    getAllPicSchedules: () => api.get('/pic-schedules'),
    getPicScheduleById: (id) => api.get(`/pic-schedules/${id}`),
    updatePicScheduleById: (id, requestBody) => api.put(`/pic-schedules/${id}`, requestBody),
    deletePicScheduleByIds: (requestBody) => api.delete(`/pic-schedules`, { data: requestBody }),
}