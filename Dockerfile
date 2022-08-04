FROM node:16
WORKDIR /app

COPY . .
EXPOSE 3000
RUN npm i

ENV NODE_ENV production
ENV SERVER_URL https://cm-sn.art
RUN npm run nuxt-build

CMD ["npm", "start"]