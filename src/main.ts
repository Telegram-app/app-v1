import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter } from "./router";
import { registerLayouts } from "./layouts/register";
import dayjs from 'dayjs'

const router = createRouter()
const pinia = createPinia();

import "@/assets/styles/style.scss";

import App from "./App.vue";

const app = createApp(App);

app.provide('dayjs', dayjs)

app.use(pinia);
app.use(router);

registerLayouts(app);

app.mount("#app");
