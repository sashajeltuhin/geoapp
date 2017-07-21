#!/bin/bash
docker build -f ./app/Dockerfile -t sashaz/acpsec:v$1 ./app