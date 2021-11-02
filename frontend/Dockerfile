FROM node:16 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/app/build /usr/share/nginx/html