import api from "../lib/axios";

export const treatmentPlansApi = {
  createPlan: (requestBody) => api.post("/treatment-plans", requestBody),
  getAllPlans: () => api.get("/treatment-plans"),
  getPlanById: (id) => api.get(`/treatment-plans/${id}`),
  updatePlanById: (id, requestBody) => api.put(`/treatment-plans/${id}`, requestBody),
  deletePlanById: (requestBody) => api.delete(`/treatment-plans`, requestBody,),
};
