#!/bin/bash
source /home/ubuntu/.profile
cd /home/ubuntu/loan-application
echo ""
echo ""
echo ""
env
echo ""
echo ""
echo ""
npm i -g pm2
pm2 start npm --name "next" -- start -f