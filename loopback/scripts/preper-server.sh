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
firewall-cmd --zone=public --add-port=3001/tcp
firewall-cmd --zone=public --add-port=3306/tcp
firewall-cmd --zone=public --add-port=22/tcp

mv /usr/share/nginx/html /usr/share/nginx/html-old

ln -s /fcognates/app/static /usr/share/nginx/html

sleep 1

systemctl enable nginx
systemctl start nginx


grep 'A temporary password is generated for root@localhost' /var/log/mysqld.log |tail -1

# MySQL (for development purposes only)
# SET PASSWORD FOR 'root'@'localhost' = PASSWORD('password');
# GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';

# Remote Access to all IPs (for development purposes only)
# vi /etc/my.cnf
# bind-address = *

# Enable SPA redirect to index, like htaccess
# nginx configuration
# vi /etc/nginx/nginx.conf
# location / {
#   if (!-e $request_filename){
#     rewrite ^/(.*)$ /index.html break;
#   }
# }

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
# 3. Run SQL Backup to create tables
# 4. Create MySQL Stored Procedures
# 5. Run npm install for Loopback
# 6. Create crons for backup and auto-restart services
# 7. Enable GZIP on nginx
# 8. Enable browser cache on nginx


