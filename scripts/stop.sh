#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server
pm2 stop index.ts 2> /dev/null || true
pm2 delete index.ts 2> /dev/null || true