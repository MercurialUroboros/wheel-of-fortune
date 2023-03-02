# build stage
FROM node:16.14.2-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.20.1-alpine as production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx-client.conf /etc/nginx/sites-available/nginx-client.conf
COPY ./nginx/start.sh start.sh
EXPOSE 80

CMD ["/start.sh"]