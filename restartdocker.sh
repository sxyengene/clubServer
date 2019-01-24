#!/bin/bash
git pull

docker ps | grep sxyengene/clubserver | xargs docker rm -f

docker build -t sxyengene/clubserver .

docker run -d -p 7001:7001 -v /root/git/clubServer/src/logs/:/var/www/html/clubServer/src/logs/ sxyengene/clubserver
#docker run -d -p 7001:7001 -v ./src/logs:/logs sxyengene/clubserver
