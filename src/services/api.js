import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Obtener tokens desde localStorage
const getAuthToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Crear la instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para actualizar el token en localStorage y en Axios
export const setAuthToken = (token, refreshToken = null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar token expirado y refrescarlo
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es un error 401 y no hemos intentado refrescar el token aún
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        console.error("No hay refreshToken disponible. Redirigir a login.");
        return Promise.reject(error);
      }

      try {
        // Solicitar un nuevo token con el refreshToken
        const { data } = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        // Guardar el nuevo token y reintentar la petición original
        setAuthToken(data.access, refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        return api(originalRequest); // Reintenta la petición con el nuevo token
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        setAuthToken(null); // Limpiar tokens y forzar logout si falla
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
