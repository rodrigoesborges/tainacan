<?php

namespace Tainacan\Sockets;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Listener implements MessageComponentInterface {

    protected $clients;
    protected $subscriptions;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->subscriptions = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $rawMsg) {
        $msg = json_decode( $rawMsg );

        if( isset( $msg->isSubscription ) ){
            $this->subscriptions[ $from->resourceId ][ $msg->type ] = $msg->value ;
            echo  $from->resourceId.' connected to the topic type: '.$msg->type.' Value: '.$msg->value."\n" ;
        }else if( isset( $msg->type ) && isset( $msg->value ) ){
            foreach ($this->clients as $client) {
                if ($from === $client)
                    continue;

                if( isset(  $this->subscriptions[ $client->resourceId ][ $msg->type ] ) && $this->subscriptions[ $client->resourceId ][ $msg->type ] == $msg->value ){
                    $client->send($rawMsg);
                    echo  $from->resourceId.' is going to receive a message to the topic type: '.$msg->type.' Value: '.$msg->value."\n" ;
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}