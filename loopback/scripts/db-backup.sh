#!/bin/sh

# Create a cron job will backup the DB every 3 days and email it to me
# crontab -e
# 0 0 */3 * * /fcognates/app/loopback/scripts/db-backup.sh
# service crond restart

# 16bits password from env var
mysqldump testa > /fcognates/db_backup/falsecognates.sql -u root --password="$dbpass"
mysqldump testa > /fcognates/db_backup/falsecognates$DATE.sql -u root --password="$dbpass"

# Send email
echo "False Cognates Backup" | mail -s "False Cognates Backup" -a /fcognates/db_backup/falsecognates.sql $gemail
