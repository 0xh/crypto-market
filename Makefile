bin := node_modules/.bin/

log = echo "$(now) $(1)"

lint:
	$(call log,"Running ESLint ...")
	$(bin)eslint --ext .js ./src ./tests
	$(call log,"ESLint run completed.")

get-exchange-tip:
	node ./src/scripts/get-exchange-tip.js | ./node_modules/.bin/bunyan