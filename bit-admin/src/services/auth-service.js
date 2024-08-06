import BaseService from './base-service.js';

export default {
  async login(email, password) {
    const { data } = await BaseService.post(`/login`, { email, password });
    return data;
  },
  async getUserInfo() {
    const { data } = await BaseService.get(`/user-info`);
    return data;
  },
};
