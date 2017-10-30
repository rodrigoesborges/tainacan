import Vue from 'vue'
// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'

Vue.use(VueCustomElement);

import Text from './components/Text.vue';
import Textarea from './components/Textarea.vue';
import Compound from './components/Compound.vue';

Vue.customElement('tainacan-text', Text);
Vue.customElement('tainacan-textarea', Textarea);
Vue.customElement('tainacan-compound', Compound);


/*
new Vue({
  el: '#app',
  render: h => h(App)
}) */
