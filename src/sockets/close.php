<?php

$connection = @fsockopen('0.0.0.0', '8080');

socket_close ( $connection);