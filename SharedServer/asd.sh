sudo systemctl disable apparmor.service --now
sudo service apparmor teardown
docker-compose stop
