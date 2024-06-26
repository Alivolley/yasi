FROM node:20.11-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]