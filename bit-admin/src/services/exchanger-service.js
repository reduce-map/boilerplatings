import BaseService from './base-service.js';

export default {
  async getExchangesList() {
    const { data } = await BaseService.get(`/exchanges`);
    return data;
  },

  async getExchangeCashRetail() {
    const { data } = await BaseService.get(`/exchanges-retail-cash`);
    return data;
  },

  async getExchangeCashWholesale() {
    const { data } = await BaseService.get(`/exchanges-wholesale-cash`);
    return data;
  },
};
