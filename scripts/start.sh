#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep pm2 start npm -- start
#authbind --deep ./node_modules/.bin/pm2 start dist/src/index.js --watch