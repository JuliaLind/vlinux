FROM node:18

WORKDIR /server

COPY package*.json *.js ./

RUN npm install

EXPOSE 1337

CMD [ "node", "index.js" ]
