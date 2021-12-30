#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep ./node_modules/.bin/pm2 start src/index.ts --watch
