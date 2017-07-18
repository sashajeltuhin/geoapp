#!/bin/bash
cat ./deployment/AppDInsert.js ./app/server.js > ./deployment/server_temp.js && mv -f ./deployment/server_temp.js ./app/server.js;
rm -f ./deployment/server_temp.js