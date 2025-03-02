import { createApp, type App as AppType } from 'vue'
import App from './App.vue'
import router from "./router.ts";

const app: AppType = createApp(App);
app.use(router);
app.mount('#app');