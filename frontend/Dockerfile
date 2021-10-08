FROM node:latest AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build

FROM nginx:latest
COPY --from=0 /usr/src/app/build /usr/share/nginx/html