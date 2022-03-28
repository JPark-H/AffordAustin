.DEFAULT_GOAL := all
SHELL         := bash

docker:
	docker build -t test .
	docker run --rm -it -v pwd:/usr/backend -w /usr/backend -p 80:80 test

tests:
	python3 tests.py