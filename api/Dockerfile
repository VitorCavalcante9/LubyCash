FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json yarn.* ./

RUN apk add --no-cache git

RUN chown -R node:node /home/node

RUN yarn

COPY . .

USER node

EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]