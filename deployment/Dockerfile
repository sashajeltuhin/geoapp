FROM node:6
RUN mkdir -p /data/www
ADD trip/ /data/www
WORKDIR /data/www
RUN npm update
EXPOSE 8077