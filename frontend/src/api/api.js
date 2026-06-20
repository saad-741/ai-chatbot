import axios from "axios"; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          `${BASE_URL}/api/token/refresh/`,

          {
            refresh,
          }, 
        );
        const newAccess = response.data.access;

        localStorage.setItem(
          "access",
          newAccess,
        );
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
export default api;
