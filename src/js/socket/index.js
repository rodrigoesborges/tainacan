import store from '../store/store';
import { eventBus } from "../event-bus-web-components";

export const socket = {
    connection: false,
    connect( onOpen ){
        this.connection = new WebSocket('ws://192.168.20.32:8080');
        this.connection.onopen = () => {
            console.log('Conectado');
            if (onOpen) {
                onOpen();
            }
        }

        this.connection.onerror = () => {
            console.log('Não foi possível conectar-se ao servidor');
        };

        this.connection.onmessage = e => {
            this.listener ( JSON.parse(e.data) );
        }
    },
    isOffline(){
        return this.connection.readyState !== this.connection.OPEN;
    },
    listener( data ){
        console.log( 'message', data );
        // redirect actions
        if( isNaN( data.value ) ){
            location.reload();
        }else{
            if( data.metadata_value ){
                store.dispatch('item/updateMetadata', { item_id: data.value, metadata_id: data.metadata_id, values: data.metadata_value });
                eventBus.setValues();
            }else{
                location.reload();
            }
        }
    },
    subscribe( type, value ){
        console.log( 'subscribe',type, value );
        this.connection.send( JSON.stringify( { type, value, isSubscription: true } ) );
    },
    sendMessage( message ) {
        console.log( 'sendMessage', message );
        this.connection.send( JSON.stringify( message ) );
    },
}
