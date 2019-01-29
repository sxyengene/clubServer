#!/bin/bash
git pull

docker ps | grep sxyengene/clubserver | awk {'print $1'} | xargs docker rm -f

docker build -t sxyengene/clubserver .

docker run -d -p 7001:7001 -v /root/git/clubServer/src/logs/:/var/www/html/clubServer/src/logs/ -v /etc/localtime:/etc/localtime sxyengene/clubserver
#docker run -d -p 7001:7001 -v ./src/logs:/logs sxyengene/clubserver
