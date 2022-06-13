FROM node:16
WORKDIR /app

COPY . .
EXPOSE 8080
RUN npm i

RUN npm run nuxt-build-prod

CMD ["npm", "start"]