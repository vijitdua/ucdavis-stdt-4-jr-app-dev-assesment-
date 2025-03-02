import { createApp, type App as AppType } from 'vue'
import {createPinia, type Pinia} from 'pinia';

import App from './App.vue'
import router from "./router.ts";

const app: AppType = createApp(App);
const pinia: Pinia = createPinia();

app.use(router);
app.use(pinia)
app.mount('#app');