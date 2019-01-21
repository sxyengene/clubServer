#!/bin/bash
docker rm sxyengene/clubserver

docker build -t sxyengene/clubserver .

docker run -d -p 7001:7001 sxyengene/clubserver
