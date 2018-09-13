#!/bin/bash
set -e

psql "$POSTGRES_DB" -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" < ./dbBkp.sql
