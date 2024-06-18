import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecombackend-production-6b46.up.railway.app', // Replace with your API's base URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
