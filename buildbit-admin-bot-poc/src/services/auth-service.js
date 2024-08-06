import BaseService from './base-service.js';

export default {
  async login(username, password) {
    const { data } = await BaseService.post(`/login`, { username, password });
    return data;
  },
};
