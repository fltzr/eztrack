FROM node:lts-alpine as build

RUN npm i -g pnpm

WORKDIR /usr/www

COPY package.json pnpm-lock.yaml ./
COPY 

RUN pnpm i --frozen-lockfile --prod

COPY . .

