#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep tsc
cd /home/ubuntu/solutionist/server
pm2 start npm -- start
#authbind --deep pm2 start index.js
