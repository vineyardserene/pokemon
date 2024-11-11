import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import './assets/tailwind.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist); // Pinia store persistence for localStorage

axios.defaults.baseURL = "https://pokeapi.co/api/v2"; // Base URL for API requests

app.use(pinia);
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
