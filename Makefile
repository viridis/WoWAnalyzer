.PHONY: up down install install-optimized


ENVIRONMENT ?= dev

DOCKER_COMPOSE = docker-compose -f etc/docker/docker-compose.$(ENVIRONMENT).yml
NODE_CLI = docker run --rm -t -v ~/.npm:/.npm -v "$(PWD)":/usr/src/wowanalyzer -w /usr/src/wowanalyzer node:10.4-alpine

# DOCKER
up:
	$(DOCKER_COMPOSE) up

down:
	$(DOCKER_COMPOSE) down --remove-orphans

# INSTALL
install:
	$(NODE_CLI) npm install --non-interactive

# INSTALL OPTIMIZED
install-optimized:
	$(NODE_CLI) npm install --non-interactive --production
