docker-compose up -d
cat your_dump.sql | docker exec -i postgresq psql -U postgres
  
