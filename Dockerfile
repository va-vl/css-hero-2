FROM node:14.17-alpine3.11
WORKDIR /app
COPY package.json app
RUN yarn install
COPY . /app
EXPOSE 8080
