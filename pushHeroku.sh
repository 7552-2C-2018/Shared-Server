#!/bin/bash

heroku container:login
heroku container:push web -a shared-server-25
heroku container:release web -a shared-server-25
