#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep tsc
authbind --deep pm2 start npm -- start