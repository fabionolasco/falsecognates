#!/bin/bash

# Run this script after server restart (cron)

systemctl start mysqld.service
systemctl enable mysqld.service

sleep 1

firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https

sleep 1

firewall-cmd --zone=public --add-port=80/tcp
firewall-cmd --zone=public --add-port=3000/tcp
firewall-cmd --zone=public --add-port=3306/tcp
firewall-cmd --zone=public --add-port=22/tcp
firewall-cmd --zone=public --add-port=25/tcp

sleep 1

systemctl enable nginx
systemctl start nginx

# forever start server/server.js

# forever list

# forever stop <pid>

# kill -9 <pid>
