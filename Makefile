# import config.
# You can change the default config with `make cnf="config_special.env" build`
#cnf ?= config.env
#include $(cnf)
#export $(shell sed 's/=.*//' $(cnf))

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# DOCKER TASKS
# Build the container
build: ## Run for stagingBuild image
	docker build -t agustibm/cerbero .

push: ## Run for dev
	make build
	docker push agustibm/cerbero

bdd: ## Runing BDD test
	docker-compose -f docker-compose.test.yml -p ci up -d --build
	docker wait ci_oauth_1

clean: ## Clean
	docker-compose -f docker-compose.test.yml -p ci stop
	docker-compose -f docker-compose.test.yml -p ci rm -f
