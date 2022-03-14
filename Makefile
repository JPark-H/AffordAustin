.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

build-init:
	npm i
	npm run build
	serve -s build

frontend-init:
	npm i
	npm start

backend-init:
	source tutorial-env/bin/activate

backend-build:
	pip freeze > requirements.txt