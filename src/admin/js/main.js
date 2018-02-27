// Main imports
import Vue from 'vue'
import Buefy from 'buefy'

// Custom elements
import Text from '../../classes/field-types/text/Text.vue';
import Textarea from '../../classes/field-types/textarea/Textarea.vue';
import Selectbox from '../../classes/field-types/selectbox/Selectbox.vue';
import Checkbox from '../../classes/field-types/checkbox/Checkbox.vue';
import Radio from '../../classes/field-types/radio/Radio.vue';
import Numeric from '../../classes/field-types/numeric/Numeric.vue';
import Date from '../../classes/field-types/date/Date.vue';
import Relationship from '../../classes/field-types/relationship/Relationship.vue';
import TaincanFormItem from '../../classes/field-types/tainacan-form-item.vue';

// Remaining imports
import AdminPage from '../admin.vue'
import store from '../../js/store/store'
import router from './router'
import { I18NPlugin, RouterHelperPlugin } from './utilities';

// Configure and Register Plugins
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});
Vue.use(I18NPlugin);
Vue.use(RouterHelperPlugin);
Vue.use(Buefy); 

// Register Components
Vue.component('tainacan-text', Text);
Vue.component('tainacan-textarea', Textarea);
Vue.component('tainacan-selectbox', Selectbox);
Vue.component('tainacan-checkbox', Checkbox);
Vue.component('tainacan-radio', Radio);
Vue.component('tainacan-numeric', Numeric);
Vue.component('tainacan-date', Date);
Vue.component('tainacan-relationship', Relationship);
Vue.component('tainacan-form-item', TaincanFormItem);

new Vue({
    el: '#tainacan-admin-app',
    store,
    router,
    render: h => h(AdminPage)
});