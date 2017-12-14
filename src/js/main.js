import Vue from 'vue'
// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element';

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
Vue.customElement('tainacan-date', Date);


const app = new Vue({
    data: {
        queryString:null,
        text: null,
        messages: [],
        ws: null,
        isReload: false
    },

    // Quando iniciado o aplicativo
    created: function() {
        // Inicia a conexão com o websocket
        this.connect();
        this.iniQueryString();
    },

    // Métodos do aplicatvo
    methods: {
        // Método responsável por iniciar conexão com o websocket
        connect: function(onOpen) {

            var self = this;

            // Conectando
            self.ws = new WebSocket('ws://localhost:8080');

            // Evento que será chamado ao abrir conexão
            self.ws.onopen = function() {
                self.addSuccessNotification('Conectado');
                // Se houver método de retorno
                if (onOpen) {
                    onOpen();
                }
            };

            // Evento que será chamado quando houver erro na conexão
            self.ws.onerror = function() {
                self.addErrorNotification('Não foi possível conectar-se ao servidor');
            };

            // Evento que será chamado quando recebido dados do servidor
            self.ws.onmessage = e => {
                const data = JSON.parse(e.data);
                if( self.queryString.post &&  data.post.ID &&  this.queryString.post == data.post.ID){
                    location.reload();
                }else if( self.queryString.post_type &&  data.post.post_type &&  self.queryString.post_type == data.post.post_type ){
                    location.reload();
                }else if( data.ids ){
                    let ids = data.ids;
                    if( self.queryString.post &&  ids.indexOf( parseInt( self.queryString.post ) ) >= 0 ){
                        location.reload();
                    }
                }
            };

        },

        // Método responsável por adicionar uma mensagem de usuário
        //addMessage: function(data) {
           // this.messages.push(data);
           // this.scrollDown();
        //},

        // Método responsável por adicionar uma notificação de sucesso
        addSuccessNotification: function(text) {
            //this.addMessage({color: 'green', text: text});
            console.log( text );
        },

        // Método responsável por adicionar uma notificação de erro
        addErrorNotification: function(text) {
            //this.addMessage({color: 'red', text: text});
            console.log( text );
        },

        // Método responsável por enviar uma mensagem
        sendMessage: function() {

            var self = this;

            // Se não houver o texto da mensagem ou o nome de usuário
            if (!self.text || !self.user) {
                // Saindo do método
                return;
            }

            // Se a conexão não estiver aberta
            if (self.ws.readyState !== self.ws.OPEN) {

                // Exibindo notificação de erro
                self.addErrorNotification('Problemas na conexão. Tentando reconectar...');

                // Tentando conectar novamente e caso tenha sucesso
                // envia a mensagem novamente
                self.connect(function() {
                    self.sendMessage();
                });

                // Saindo do método
                return;
            }

            // Envia os dados para o servidor através do websocket
            self.ws.send(JSON.stringify({
                user: self.user,
                text: self.text,
                isReload: true
            }));

            // Limpando texto da mensagem
            self.text = null;

        },

        // Método responsável por "rolar" a scroll do chat para baixo
        scrollDown: function() {
            //var container = this.$el.querySelector('.update-nag');
            //container.scrollTop = container.scrollHeight;
        },
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