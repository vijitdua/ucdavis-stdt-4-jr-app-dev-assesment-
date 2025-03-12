/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createApp, type App as AppType } from 'vue'
import {createPinia, type Pinia} from 'pinia';

import App from './App.vue'
import router from "./router";
import { registerPlugins } from './plugins'


const app: AppType = createApp(App)
const pinia: Pinia = createPinia();

registerPlugins(app)
app.use(router);
app.use(pinia);
app.mount('#app')
