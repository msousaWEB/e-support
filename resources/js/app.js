import './bootstrap';
import {createApp} from "vue";
import App from './main/App.vue';
import Toastify from 'vue3-toastify';
import router from './router/index.js'
import '@mdi/font/css/materialdesignicons.min.css';
import "vue3-toastify/dist/index.css";


// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);

app.use(router).use(vuetify).use(
    Toastify,
    {
        dangerouslyHTMLString: true,
    },
).mount('#app');
