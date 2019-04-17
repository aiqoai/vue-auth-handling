#!/bin/bash
$(aws ecr get-login --no-include-email --region us-west-1)
docker build -t aiqo-dev .
docker tag aiqo-dev:latest 529179911672.dkr.ecr.us-west-1.amazonaws.com/aiqo-dev:latest
docker push 529179911672.dkr.ecr.us-west-1.amazonaws.com/aiqo-dev:latest
