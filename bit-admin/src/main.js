import { createApp } from 'vue';
import App from './App.vue';

// router and store
import router from './router';
import pinia from './store';

import i18n from './i18n';

// view-ui-plus
import ViewUIPlus from 'view-ui-plus';
// import locale from 'view-ui-plus/dist/locale/en-US';
import './design/theme.less';

// i18n

// global styles
import './design/styles.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(ViewUIPlus, {
  i18n,
});

app.mount('#app'); // mount the app to the DOM
