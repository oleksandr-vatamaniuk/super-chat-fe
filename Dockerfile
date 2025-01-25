FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build


FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]