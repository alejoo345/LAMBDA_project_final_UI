import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Función para obtener el CSRF token de las cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Obtener token del localStorage
const token = localStorage.getItem("token");
const getAuthToken = () => localStorage.getItem("token");
// Crear la instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"), // Solo si usas sesiones Django
  },
});

// Función para actualizar el token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

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
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('acces_token');
//         if (token){
//             config.headers['Authorization'] = 'Bearer ${token}'
//         }
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

export default api;