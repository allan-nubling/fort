FROM node:lts-alpine

WORKDIR /home/node/app

COPY package*.json babel.config.js ./

COPY src ./src

RUN npm i

RUN npm run build

EXPOSE 3000

CMD node ./build/server.js