FROM node:lts-alpine AS builder

RUN node --version

WORKDIR /build

COPY . /build


RUN npm install 


RUN npm run build




CMD ["npm", "start"]