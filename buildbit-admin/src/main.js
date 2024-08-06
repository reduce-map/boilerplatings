import { createApp } from 'vue'

import 'font-awesome/css/font-awesome.min.css';
// import 'vue-advanced-chat/dist/vue-advanced-chat.css';

import App from './App.vue'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

const app = createApp(App);
app.use(ViewUI);
app.mount('#app');
