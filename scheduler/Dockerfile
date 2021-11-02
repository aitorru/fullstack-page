FROM node:16
WORKDIR /usr/src/scheduler
COPY . .
RUN yarn && npm install -g typescript && yarn build
CMD [ "yarn", "start:prod" ]