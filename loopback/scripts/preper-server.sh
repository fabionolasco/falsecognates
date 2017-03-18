#!/bin/bash

# Script to configure new server
# Run this script to install necessary applications

cd / && mkdir installs && cd /installs
yum update -y
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | bash -
yum install -y nodejs

yum install -y epel-release yum-utils
yum-config-manager --enable epel
yum clean all
yum install -y nginx

yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm

yum install mysql-community-server

systemctl start mysqld.service

systemctl enable mysqld.service

npm install -g forever

npm install -g loopback-cli

sleep 1

firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https

sleep 1

firewall-cmd --zone=public --add-port=80/tcp
firewall-cmd --zone=public --add-port=3000/tcp
firewall-cmd --zone=public --add-port=3306/tcp
firewall-cmd --zone=public --add-port=22/tcp

sleep 1

systemctl enable nginx
systemctl start nginx

grep 'A temporary password is generated for root@localhost' /var/log/mysqld.log |tail -1

# MySQL (for development purposes only)
# GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'newpassword';

# Remote Access to all IPs (for development purposes only)
# vi /etc/my.cnf
# bind-address = *

# Enable SPA redirect to index, like htaccess
# nginx configuration
# vi /etc/nginx/nginx.conf
# location /appName/ {
#   if (!-e $request_filename){
#     rewrite ^/appName/(.*)$ /appName/index.html break;
#   }
# }

# Last Steps
# 1. Upload compiled False Cognates project (angular)
# 2. Upload Loopback files
# 3. Run npm install for Loopback
# 4. Run loopback instance
