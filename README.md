# Build Setup

> npm install
> npm run build
> npm run pm2

# Build including Docker (production)
> npm run docker-build
> npm run docker-up

# env 
## production checklist
> GOOGLE_APPLICATION_CREDENTIALS = /home/ubuntu/.googlecloud/logging-cmsn-prod.json

## development checklist
```
env boolean 판정할땐 꼭 process.env.ENV_TEST === '0' 식으로 하기
env-cast 라는 모듈 만들었으니까 이용하기(2021.04.10)
NODE_ENV: production development
DEBUG: debug 모듈에서 이용
GOOGLE_APPLICATION_CREDENTIALS: google cloud log 인증 파일 패스
```

## others

``` bash

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
GOOGLE_APPLICATION_CREDENTIALS env 설정
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```





For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
