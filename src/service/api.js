import axios from 'axios';

const api = axios.create({
     //baseURL: 'https://financial-control-api.herokuapp.com'
     baseURL: 'http://localhost:8081/'
});

export default api;