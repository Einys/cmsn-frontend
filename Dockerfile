FROM node:16
WORKDIR /app

COPY . .
EXPOSE 8080
RUN npm i

ENV SERVER_URL 127.0.0.1:8080
RUN npm run nuxt-build-prod

CMD ["npm", "start"]