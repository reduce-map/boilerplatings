import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // auth
    {
      path: '/sign-in',
      component: () => import('./pages/sign-in.vue'),
      name: 'sign-in',
      meta: { requiresAuth: false },
    },
    // {
    //   path: '/register',
    //   component: () => import('./pages/register-and-login.vue'),
    //   name: 'register',
    //   meta: { requiresAuth: false },
    // },
    { path: '/sign-out', name: 'sign-out', component: () => import('./pages/sign-out.vue') },

    // data pages
    { path: '/', component: () => import('./pages/dashboard-page.vue'), name: 'dashboard' },
    { path: '/settings', component: () => import('./pages/settings-page.vue'), name: 'settings' },

    // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#Custom-regex-in-params
    { path: `/exchange/:id(\\d+)`, component: () => import('./pages/exchange-page.vue'), name: 'exchange' },
    // { path: '/profile', component: () => import('./pages/profile-page.vue'), name: 'profile' },

    // dev pages
    { path: '/design-system', component: () => import('./pages/design-system.vue'), name: 'design-system' },
    { path: '/dev', component: () => import('./pages/dev.vue'), name: 'dev' },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.loggedIn;

  // console.log(authStore);

  if (
    !isLoggedIn && // make sure the user is authenticated
    to.name !== 'sign-in' // ❗️ Avoid an infinite redirect
  ) {
    return { name: 'sign-in' }; // redirect the user to the sign-in page
  }
});

export default router;
