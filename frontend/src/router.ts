import {createWebHistory, createRouter} from 'vue-router';
import type {Router} from 'vue-router';

import App from "./App.vue";
import Persons from "./pages/Persons.vue";
import Person from "./pages/Person.vue";

const routes = [

    { path: '/', component: App },

    { path: `/persons`, component: Persons},
    { path: '/persons/:id', component: Person },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
