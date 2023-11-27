# vlinux
My final project in the course Vlinux ht23.

Consist of:
  - a bash script to convert a log file to json with the help of regex+sed and awk
  - an Express/Nodejs based server that serves the data from the above json file
  - a command line client in bash for testing the server
  - a simple SPA webclient in vanilla js that uses the server

## Get started

If you have docker on your computer, stand in the root directory and run ```./dockerhub.bash```.

This will start all three containers (server, webbclient and command line client).
In the terminal write ```./bthloggen.bash -h``` to get the available options and commands for command line.
Write ```./bthloggen.bash url``` to get the web-urls for server and client or visit them directly on localhost:1337 (server) and localhost:1338 (webclient)
