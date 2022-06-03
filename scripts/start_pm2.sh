source /home/ubuntu/.profile
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install nodejs
node -v
cd /home/ubuntu/loan-application
echo ""
echo ""
echo ""
env
echo ""
echo ""
echo ""
sudo npm i -g pm2
sudo pm2 start npm --name "next" -- start -f