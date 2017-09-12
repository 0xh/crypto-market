bin := node_modules/.bin/

log = echo "$(now) $(1)"

lint:
	$(call log,"Running ESLint ...")
	$(bin)eslint --ext .js ./src ./tests
	$(call log,"ESLint run completed.")

balance-all-calc:
	node ./src/scripts/balance-all-calc.js | ./node_modules/.bin/bunyan

balance-edges-calc:
	node ./src/scripts/balance-edges-calc.js | ./node_modules/.bin/bunyan