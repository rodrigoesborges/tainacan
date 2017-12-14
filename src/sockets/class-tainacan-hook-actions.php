<?php

namespace Tainacan\Sockets;

use WebSocket\Client;

class Hook_Actions{

    private $connection;
    private $hostname = '0.0.0.0';
    private $port = '8080';

    /**
     * Hook_Actions constructor.
     */
    public function __construct(){
        add_action( 'wp_insert_post', array(&$this, 'broadcast_new_post'), 10, 3);
        add_action( 'transition_post_status',  array(&$this, 'broadcast_new_status'), 10, 3 );
        add_action( 'updated_post_meta',  array(&$this, 'broadcast_alter_metadata'), 10, 4 );
    }

    /**
     * Sent message to the server socket
     *
     * @param $msg
     * @return bool
     */
    private function send_message( $msg ){
        $msg = json_encode( $msg );
        $client = new Client("ws://0.0.0.0:8080");
        $client->send( $msg );
    }


    public function broadcast_new_post( $post_id, $post, $update ){

        // If this is a revision

        if ( wp_is_post_revision( $post_id ) || (  $post->post_status === 'auto-draft' ) )
            return;


        if($post->post_type === 'tainacan-metadata'){
            global $Tainacan_Items;
            $ids = [];
            $metas = get_metadata('post', $post_id);

            if( $metas['collection_id'] ){
                $items = $Tainacan_Items->fetch( [], $metas['collection_id'][0],'OBJECT');
                foreach ($items as $item) {
                    $ids[] = $item->get_id();
                }
            }

            $this->send_message([ 'post' => $post, 'isReload' => true, 'metas' => $metas, 'ids' => $ids ]);
        }else{
            $this->send_message([ 'post' => $post, 'isReload' => true, 'metas' => get_metadata('post', $post_id) ]);
        }
    }

    public function broadcast_alter_metadata( $meta_id, $post_id, $meta_key, $meta_value ){
        global $Tainacan_Metadatas;
        $post = get_post( $post_id );
        $metadata = $Tainacan_Metadatas->fetch( $meta_key );

        if ( strpos($post->post_type, 'tnc_col_') === false || $metadata === null)
            return;

        return $this->send_message([ 'post' => $post, 'metadata_id' =>  $meta_key, 'value' => $meta_value,'isItem' => true ]);
    }

    function broadcast_new_status( $new_status, $old_status, $post ) {

        if ( $post->post_status === 'auto-draft' )
            return;

        if ( $new_status != $old_status ) {
            $this->send_message([ 'post' => $post, 'isReload' => true ]);
        }
    }

}

$class = new Hook_Actions();