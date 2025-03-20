import {createWebHistory, createRouter} from 'vue-router';
import type {Router} from 'vue-router';

import Persons from "./pages/Persons.vue";
import Person from "./pages/Person.vue";
import Home from "./pages/Home.vue";

const routes = [

  {path: '/', component: Home},

  {path: `/persons`, component: Persons},
  {path: '/person/:id', component: Person},
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
