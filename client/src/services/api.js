import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getReviewHistory = () => api.get("/review/history");
export const getReviewById = (id) => api.get(`/review/${id}`);
export const deleteReview = (id) => api.delete(`/review/${id}`);

export const getInterviewHistory = () => api.get("/prep/history");
export const getInterviewById = (id) => api.get(`/prep/${id}`);
export const deleteInterview = (id) => api.delete(`/prep/${id}`);

export default api;