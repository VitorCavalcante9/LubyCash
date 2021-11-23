FROM node:alpine

WORKDIR /src/ms_clients

COPY package.json yarn.* ./

RUN yarn

# RUN yarn add jsonwebtoken

COPY . .

EXPOSE 3334

CMD ["yarn", "dev:server"]