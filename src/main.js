import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import the createStore method
import { createStore } from 'vuex'
import store from './store'
import './assets/tailwind.css'

createApp(App).use(store).use(router).mount('#app');

