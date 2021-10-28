FROM node:latest AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn add tsc && yarn build

FROM node:latest
WORKDIR /usr/src/scheduler
COPY --from=0 /usr/src/app /usr/src/scheduler
RUN yarn
CMD ['yarn', 'start']