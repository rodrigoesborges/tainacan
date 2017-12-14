<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__.'/class-tainacan-listener.php';

error_reporting(E_ALL);

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Tainacan\Sockets;

$connection = @fsockopen('0.0.0.0', '8080');

if(!$connection){
    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Sockets\Listener()
            )
        ),
        8080
    );
    $server->run();
}
