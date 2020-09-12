#!/bin/bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
yes | sudo apt-get install -y nodejs
npm i
cd src
node server.js &