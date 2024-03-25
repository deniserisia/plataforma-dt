FROM node:latest as angular
WORKDIR /app
COPY package.json /app 
RUN  npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine

VOLUME var/cache/

COPY  --from=angular app/dist/dt-app /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t dt-app .
# docker run -p 8081:87 dt-app

#dt-app\docker-compose.yml" up -d --build 