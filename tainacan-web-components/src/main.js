import Vue from 'vue'
// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'

Vue.use(VueCustomElement);

import Text from './components/Text.vue'
Vue.customElement('tainacan-text', Text);


/*
new Vue({
  el: '#app',
  render: h => h(App)
}) */
