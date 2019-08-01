FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]
