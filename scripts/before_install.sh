#!/bin/bash
FILE=/home/ubuntu/loan-application/package.json
if test -f "$FILE"; then
    echo "$FILE exists"
    cd /home/ubuntu
    pm2 stop --silent next
    pm2 delete next
    sudo killall -9 node
else
    echo "$FILE does not exist."
fi
cd /home/ubuntu/
sudo rm -rf loan-application
sudo mkdir loan-application