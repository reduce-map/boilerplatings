import { createRouter, createWebHistory } from 'vue-router';
import LargeDataSetExample from './components/large-data-set-example/LargeDataSetExample.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('./pages/registerLogin.vue'), name: 'loginlogin' },
    { path: '/register', component: () => import('./pages/registerLogin.vue'), name: 'registerlogin' },
    { path: '/', component: () => import('./pages/Dashbord.vue'), name: 'Rich Grid with Pure JavaScript' },
    { path: '/large-data', component: LargeDataSetExample, name: 'Large Data Example' },
  ],
});

export default router;
