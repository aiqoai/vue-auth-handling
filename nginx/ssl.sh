#!/bin/bash


openssl genrsa -des3 -out server.key 1024

openssl req -new -key server.key -out server.csr

openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

openssl rsa -in futurestudio_with_pass.key -out futurestudio.key



#https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx
