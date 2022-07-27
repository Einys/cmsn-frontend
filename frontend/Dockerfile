FROM node:16
WORKDIR /app

COPY . .
EXPOSE 3000
RUN npm i

ENV NODE_ENV production
RUN npm run build

CMD ["npm", "start"]