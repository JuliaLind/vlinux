FROM ubuntu:22.04

RUN apt update && apt install -y curl jq

WORKDIR /client

COPY bthloggen.bash .

CMD ["bash"]
