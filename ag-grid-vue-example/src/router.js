import RichGridExample from './rich-grid-example/RichGridExample.vue';
import LargeDataSetExample from './large-data-set-example/LargeDataSetExample.vue';

import {createRouter} from 'vue-router';

const router = createRouter({
    mode: 'history',
    routes: [
        {path: '/', component: RichGridExample, name: 'Rich Grid with Pure JavaScript'},
        {path: '/large-data', component: LargeDataSetExample, name: 'Large Data Example'},
    ],
})

export default router;
