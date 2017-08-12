#!/bin/sh

# Create a cron job that will run every 1 min
# crontab -e
# */1 * * * * /fcognates/app/loopback/scripts/cron.sh
# service crond restart

if forever list | grep server; then
        echo "Already running loopback.";
        exit 0
else

        systemctl start mysqld.service
        systemctl enable mysqld.service

        sleep 1

        firewall-cmd --permanent --zone=public --add-service=http
        firewall-cmd --permanent --zone=public --add-service=https

        sleep 1

        firewall-cmd --zone=public --add-port=80/tcp
        firewall-cmd --zone=public --add-port=3000/tcp
        firewall-cmd --zone=public --add-port=3001/tcp
        firewall-cmd --zone=public --add-port=3306/tcp
        firewall-cmd --zone=public --add-port=22/tcp
        firewall-cmd --zone=public --add-port=25/tcp

        sleep 1

        systemctl enable nginx
        systemctl start nginx

        /usr/bin/forever start /fcognates/app/loopback/server/server.js

        exit 0

fi
