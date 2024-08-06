import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/dashboard-page.vue'), name: 'dashboard' },
    { path: '/settings', component: () => import('./pages/settings-page.vue'), name: 'settings' },
    { path: '/design-system', component: () => import('./pages/design-system.vue'), name: 'design-system' },
  ],
});

export default router;
