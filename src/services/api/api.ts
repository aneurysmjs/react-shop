import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
