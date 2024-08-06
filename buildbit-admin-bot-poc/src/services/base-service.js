import axios from 'axios';

const baseDomain = `${process.env.VUE_APP_BASE_URL}`;
const baseURL = `${baseDomain}/api`;

console.log(baseDomain, baseURL);

const BaseService = axios.create({
  baseURL,
});

export default BaseService;
