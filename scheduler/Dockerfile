FROM node:16
WORKDIR /usr/src/scheduler
COPY . .
RUN yarn && yarn add tsc && yarn build
CMD [ "yarn", "start" ]