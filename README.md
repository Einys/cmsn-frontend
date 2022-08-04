# Setup

> npm install
> export HOST=localhost (로컬 머신에서만 HOST 를 localhost로 설정)
> npm run dev

# Build Docker ECR (production)
안 될 경우 ecr 로그인 확인

> npm run docker-make

# env 
## production checklist
> GOOGLE_APPLICATION_CREDENTIALS = /home/ubuntu/.googlecloud/logging-cmsn-prod.json
