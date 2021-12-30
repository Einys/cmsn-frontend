FROM node:16
WORKDIR /app

COPY . .
EXPOSE 8080
RUN npm i

ENV SERVER_URL $SERVER_URL_TEST
RUN npm run nuxt-build-prod

CMD ["npm", "start"]