import axios from 'axios';

const baseURL = `${process.env.VUE_APP_API_URL}`;

const BaseService = axios.create({
  baseURL,
});

export default BaseService;
