import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import store from './store/store';
import { eventBus } from './event-bus-web-components';
import { socket } from './socket/index'

Vue.use(VueCustomElement);

import Text from '../classes/field-types/text/Text.vue';
import Textarea from '../classes/field-types/textarea/Textarea.vue';
import Selectbox from '../classes/field-types/selectbox/Selectbox.vue';
import Checkbox from '../classes/field-types/checkbox/Checkbox.vue';
import Radio from '../classes/field-types/radio/Radio.vue';
import Numeric from '../classes/field-types/numeric/Numeric.vue';
import Date from '../classes/field-types/date/Date.vue';


Vue.customElement('tainacan-text', Text);
Vue.customElement('tainacan-textarea', Textarea);
Vue.customElement('tainacan-selectbox', Selectbox);
Vue.customElement('tainacan-checkbox', Checkbox);
Vue.customElement('tainacan-radio', Radio);

Vue.customElement('tainacan-numeric', Numeric);
eventBus.registerComponent( 'tainacan-numeric' );

Vue.customElement('tainacan-date', Date);
eventBus.registerComponent( 'tainacan-date' );

eventBus.listener();

const app = new Vue({
    store,
    data: {
        queryString:null,
        text: null,
        messages: [],
        ws: null,
        isReload: false
    },
    created: function() {
        let subscription = 0;
        this.iniQueryString();

        if( this.queryString.post ){
            subscription = this.queryString.post;
        }else if( this.queryString.post_type ){
            subscription = this.queryString.post_type ;
        }

        socket.connect(() => {
            socket.subscribe('post', subscription );
        });

    },
    methods: {
        parseQueryString( query ){
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        },
        iniQueryString(){
            let query = window.location.search.substring(1);
            this.queryString = this.parseQueryString( query );
        }
    }
});
