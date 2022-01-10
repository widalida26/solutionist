#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep tsc

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET_KEY --query Parameters[0].Value | sed 's/"//g')
echo SECRET_KEY

cd /home/ubuntu/solutionist/server/dist/src
authbind --deep pm2 start -f index.js
