#! /bin/bash

var=$(php --version)
versaophp=${var:4:1}
if [ "$versaophp" = "7" ]
 then
   echo "Versão 7!\n Instalando a versão do PHPUnit compatível!"
   sudo wget https://phar.phpunit.de/phpunit-6.5.7.phar -P /tmp
   sudo chmod +x /tmp/phpunit-6.5.7.phar
   sudo mv /tmp/phpunit-6.5.7.phar /usr/local/bin/phpunit
 else
   echo "Outra versão! Mantendo a instalação padrão!"
fi
