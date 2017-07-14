FROM node:6
RUN mkdir -p /data/www/trip
RUN mkdir -p /data/www/server
ADD server/ /data/www/server
ADD trip/ /data/www/trip
ADD package.json /data/www
ADD server.js /data/www
WORKDIR /data/www
RUN npm install
WORKDIR /data/www/trip
RUN npm install
WORKDIR /data/www
EXPOSE 8077