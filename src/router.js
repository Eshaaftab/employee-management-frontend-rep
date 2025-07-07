import { createRouter, createWebHistory } from 'vue-router';
import Employees from './components/Employees.vue';
import Dashboard from './components/Dashboard.vue';
import Departments from './components/Departments.vue';

const routes = [
  { path: '/', component: Employees },
  { path: '/dashboard', component: Dashboard },
  { path: '/departments', component: Departments }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
