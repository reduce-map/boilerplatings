import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import pinia from './store';

import ViewUIPlus from 'view-ui-plus';

import locale from 'view-ui-plus/dist/locale/ru-RU';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './styles.scss';
import './theme.less';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ViewUIPlus, {
  locale,
});

app.mount('#app');
