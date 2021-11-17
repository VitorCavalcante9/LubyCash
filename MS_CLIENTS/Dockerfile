FROM node:alpine

WORKDIR /src/ms_clients

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3334

CMD ["yarn", "dev:server"]