#!/bin/sh

docker-compose up -d
cd sf-psl-frontend
npm install
echo "Waiting for kimai to start up"
while true; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8001/api/customers")

    if [ "$response" -ne 502 ]; then
        break
    else
        echo "Kimai is still starting. Retrying in 5 seconds..."
        sleep 5
    fi
done
npm start