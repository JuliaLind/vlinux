FROM ubuntu:22.04

WORKDIR /webbclient

RUN apt update && apt install -y npm


COPY package*.json *.js index.html style.min.css favicon.png ./
COPY ./src/* ./src/

RUN npm install

EXPOSE 9000

CMD ["python3", "-m", "http.server", "9000"]
