FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

RUN yarn cache clean --force

COPY package.json yarn.* ./

RUN apk add --no-cache git

RUN chown -R node:node /home/node

RUN yarn

COPY . /home/node/app/

USER node

EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]