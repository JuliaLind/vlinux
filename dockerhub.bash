#!/usr/bin/env bash

#
# Script for starting server, webbclient and client
# via docker-compose/yml
#

docker-compose up -d server
docker-compose up -d webbclient
docker-compose run --rm client
docker-compose down
