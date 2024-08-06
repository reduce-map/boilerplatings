import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import pinia from './store';
import ViewUIPlus from 'view-ui-plus';

import 'view-ui-plus/dist/styles/viewuiplus.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './styles.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ViewUIPlus);

app.mount('#app');
