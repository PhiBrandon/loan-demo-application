#!/bin/bash
source /home/ubuntu/.profile
FILE=/home/ubuntu/loan-demo-application/package.json
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
sudo rm -rf loan-demo-application
echo "$HOME"
echo "$USER"
echo ""
echo ""
echo ""
env
echo ""
echo ""
echo ""
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"