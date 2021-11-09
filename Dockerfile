FROM node:16
WORKDIR /app

COPY . .
EXPOSE 8080

ENV SERVER_URL $SERVER_URL_TEST
RUN npm run build-prod

CMD ["npm", "start"]