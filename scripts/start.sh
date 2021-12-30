#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep ./node_modules/.bin/pm2 start dist/src/index.js --watch