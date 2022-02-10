FROM node

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY controllers ./controllers

COPY models ./models

COPY utils ./utils

COPY routes.js .

COPY server.js .

COPY .env ./

RUN ls ./

RUN npm install -g npm@8.4.0 -y

# EXPOSE 1993

CMD ["npm", "start"]
