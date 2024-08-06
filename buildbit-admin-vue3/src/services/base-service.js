import axios from 'axios';

const baseDomain = `${process.env.VUE_APP_BASE_URL}`;
const baseURL = `${baseDomain}`;

const BaseService = axios.create({
  baseURL,
});

export default BaseService;
