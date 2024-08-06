import { defineStore } from 'pinia';
import AuthService from '@/services/auth-service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('auth.currentUser')) || null,
    userInfo: null,
    authError: null,
  }),
  getters: {
    loggedIn: (state) => !!state?.currentUser?.token,
    role: (state) => state?.currentUser?.role,
    email: (state) => state?.currentUser?.email,
    companyName: (state) => state?.userInfo?.companyName,
  },
  actions: {
    async login(email, password) {
      try {
        const user = await AuthService.login(email, password);
        this.setCurrentUser(user);
      } catch (error) {
        this.authError = 'Invalid email or password';
      }
    },
    setCurrentUser(user) {
      this.currentUser = user;
      localStorage.setItem('auth.currentUser', JSON.stringify(user));
    },
    async getUserInfo() {
      const userInfo = await AuthService.getUserInfo();
      this.userInfo = userInfo;
    },
    async validate() {
      if (!this.loggedIn) return null;

      try {
        const { data } = await AuthService.validate();
        this.setCurrentUser(data);
        return data;
      } catch (error) {
        this.setCurrentUser(null);
        throw error;
      }
    },
    signOut() {
      this.currentUser = null;
      localStorage.removeItem('auth.currentUser');
    },
  },
});
