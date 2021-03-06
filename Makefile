.PHONY: all bash build clean down logs restart start status stop tail

SERVER_SERVICE_NAME = server

all: start

bash:
	@docker-compose run --rm $(SERVER_SERVICE_NAME) bash

build:
	@docker-compose build

down:
	@docker-compose down

logs:
	@docker-compose logs -f

restart: stop start

reload:
	@docker-compose restart $(SERVER_SERVICE_NAME)

dev: build restart

start:
	@docker-compose up -d

up: start

status:
	@docker-compose ps

stop:
	@docker-compose stop

composer-migrate:
	@docker-compose run --rm $(SERVER_SERVICE_NAME) vendor/bin/phinx migrate -c src/phinx/config.php

composer-install:
	@docker-compose run --rm $(SERVER_SERVICE_NAME) composer install