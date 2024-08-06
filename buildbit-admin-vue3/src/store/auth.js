import { defineStore } from 'pinia';
import AuthService from '@/services/auth-service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('auth.currentUser')) || null,
    authError: null,
  }),
  getters: {
    loggedIn: (state) => !!state.currentUser,
  },
  actions: {
    async login(username, password) {
      console.log('login auth store');
      try {
        const user = await AuthService.login(username, password);
        this.setCurrentUser(user);
      } catch (error) {
        this.authError = 'Invalid username or password';
      }
    },
    setCurrentUser(user) {
      this.currentUser = user;
      localStorage.setItem('auth.currentUser', JSON.stringify(user));
    },
    logOut() {
      this.currentUser = null;
      localStorage.removeItem('auth.currentUser');
    },
    async validate() {
      if (!this.currentUser) return null;
      try {
        const { data } = await AuthService.validate();
        this.setCurrentUser(data);
        return data;
      } catch (error) {
        this.setCurrentUser(null);
        throw error;
      }
    },
  },
});
