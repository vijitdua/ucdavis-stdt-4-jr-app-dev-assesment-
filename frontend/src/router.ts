import {createWebHistory, createRouter} from 'vue-router';
import type {Router} from 'vue-router';

import Persons from "./pages/Persons.vue";
import Person from "./pages/Person.vue";
import Home from "./pages/Home.vue";
import AddPersonForm from "@/pages/AddPersonForm.vue";

const routes = [

  {path: '/', component: Home},

  {path: `/persons`, component: Persons},
  {path: '/person/:id', component: Person},
  {path: '/add', component: AddPersonForm},
  { path: '/edit/:id', component: AddPersonForm },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
