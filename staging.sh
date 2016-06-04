#!/bin/bash
# wget http://nodejs.org/dist/latest-v4.x/node-v4.2.3-linux-x64.tar.gz
# tar --no-same-owner -xzf node-v4.2.3-linux-x64.tar.gz
# export CLICOLOR=1

# PATH=$PATH:/root/node-v4.2.3-linux-x64/bin/
# chmod -R 0755 node-v4.2.3-linux-x64

# npm i -g babel-cli babel webpack webpack-dev-server mocha istanbul
# npm i

nohup npm run server > server.txt &
nohup npm start -- --host 0.0.0.0 --port 9191 > front.txt &
