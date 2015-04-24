
REPORTER = spec
TESTS = test/
APP_PATH = index.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter $(REPORTER) \
		--recursive \
		--growl \
		$(TESTS)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter $(REPORTER) \
		--recursive \
		--growl \
    --ui bdd \
    --watch \
		$(TESTS)


.PHONY: test test-w
