#!/bin/bash
$(aws ecr get-login --no-include-email --region us-west-1)
echo "pull image"
docker pull 529179911672.dkr.ecr.us-west-1.amazonaws.com/aiqo-dev:latest
uicontainer=docker ps --format "{{.Names}}"
echo "stop container"
docker stop $uicontainer
echo "start new container"
docker run -it -p 80:8080  -d 529179911672.dkr.ecr.us-west-1.amazonaws.com/aiqo-dev:latest
