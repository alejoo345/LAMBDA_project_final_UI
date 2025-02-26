import axios from 'axios';

const api = axios.create({
    baseURL: '',
    withCredentials: true,
    headers: {
        
    }
}   
)

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