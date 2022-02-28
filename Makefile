.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

init:
	npm i
	npm start

build-init:
	npm i
	npm run build
	serve -s build