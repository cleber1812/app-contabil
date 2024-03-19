import axios from 'axios'

// const api = axios.create({baseURL: 'http://10.0.2.2:3000/'}) 
// const api = axios.create({baseURL: 'http://localhost:3306/'}) 
//const api = axios.create({baseURL: 'http://localhost:3000/'}) 
//const api = axios.create({baseURL: '127.0.0.1:3000/'}) 
//const api = axios.create({baseURL: 'https://desolate-wildwood-71856.herokuapp.com/'}) 
// const api = 'http://localhost:3000';
//export default API_BASE_URL;

// const api = axios.create({baseURL: 'http://localhost:3000'});
const api = axios.create({baseURL: 'https://api-contabil.vercel.app/'}) 


// Adiciona um interceptor para incluir o token nas requisições
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api

