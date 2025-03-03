import { createApp, type App as AppType } from 'vue'
import {createPinia, type Pinia} from 'pinia';

import App from './App.vue'
import router from "./router.ts";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app: AppType = createApp(App);
const pinia: Pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives,
});

app.use(router);
app.use(pinia);
app.use(vuetify);
app.mount('#app');