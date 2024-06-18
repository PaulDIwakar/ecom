import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API's base URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
