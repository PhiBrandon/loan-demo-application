#!/bin/bash
cd /home/ubuntu/loan-application
pm2 start npm --name "next" -- start -f