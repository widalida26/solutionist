#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep pm2 start npm -- build
authbind --deep pm2 start npm -- start