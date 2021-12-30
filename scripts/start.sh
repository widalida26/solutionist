#!/bin/bash
cd /home/ubuntu/solutionist/server/src
authbind --deep ./node_modules/.bin/pm2 start src/index.ts --watch