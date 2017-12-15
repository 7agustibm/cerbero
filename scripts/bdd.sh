#!/bin/bash
SERVICE=ci_oauth_1
cd ${PWD%'scripts'}
docker-compose -f docker-compose.test.yml -p ci up -d --build
docker wait $SERVICE
RESULT=$?
if [ $RESULT -eq 1 ]; then
    docker logs  $SERVICE
fi
docker-compose -f docker-compose.test.yml -p ci stop
docker-compose -f docker-compose.test.yml -p ci rm -f
exit $RESULT