FROM node:16 as base
WORKDIR /app
COPY package.json .

FROM base as development
RUN npm install 
# 튜토리얼대로 했는데 production만 설치하는 조건문 부분은 안 됨..
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base as production
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]