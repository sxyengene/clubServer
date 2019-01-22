#!/bin/bash
git pull

docker ps | grep sxyengene/clubserver | xargs docker rm -f

docker build -t sxyengene/clubserver .

docker run -d -p 7001:7001 sxyengene/clubserver
