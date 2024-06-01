include .env

export

.PHONY: build
build:
	docker compose -p $(PROJECT_NAME) -f docker-compose.yml build

.PHONY: start
start:
	docker compose -p $(PROJECT_NAME) -f docker-compose.yml up