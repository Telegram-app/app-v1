import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter } from "./router";
import { registerLayouts } from "./layouts/register";
import dayjs from 'dayjs'

const router = createRouter()
const pinia = createPinia();

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import "@/assets/styles/style.scss";

import App from "./App.vue";

const app = createApp(App);

app.provide('dayjs', dayjs)

app.use(pinia);
app.use(router);

registerLayouts(app);


app.component('VueDatePicker', VueDatePicker);

app.mount("#app");
