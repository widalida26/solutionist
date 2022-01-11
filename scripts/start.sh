#!/bin/bash
cd /home/ubuntu/solutionist/server
authbind --deep tsc

export RDS_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_USERNAME --query Parameters[0].Value | sed 's/"//g')
export RDS_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export RDS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PORT --query Parameters[0].Value | sed 's/"//g')
export RDS_DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE --query Parameters[0].Value | sed 's/"//g')
export RDS_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_HOST --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET_KEY --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export CLIENT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_URI --query Parameters[0].Value | sed 's/"//g')

cd /home/ubuntu/solutionist/server/dist/src
authbind --deep pm2 start -f index.js
