const _ = require('lodash')

const log = require('../common/logger')
const platform = require('../utils/bittrex')
const config = require('../config')

function toShi(val) {
  return _.round(val, 8)
}

async function getExchangeTip() {
  const currencies = config.currencies
  let balances = []
  let markets = []

  for (const currency of currencies) {
    balances.push(platform.getBalance(currency))
    if (currency !== 'BTC') {
      markets.push(platform.getTicker(currency))
    }
  }

  balances = await Promise.all(balances)
  markets = await Promise.all(markets)

  const wallet = []
  let btc = null

  for (const i in balances) {
    if (balances[i]) {
      const balance = balances[i].result
      const currency = {
        name: balance.Currency,
        balance: balance.Available || 0,
        est: balance.Available || 0,
      }

      if (currency.name !== 'BTC') {
        const market = markets[i - 1].result
        currency.est *= market.Last
      }

      currency.balance = currency.balance
      currency.est = currency.est

      if (currency.name === 'BTC') {
        btc = _.clone(currency)
        continue
      }

      wallet.push(currency)
    }
  }

  const min = _.minBy(wallet, 'est')
  const max = _.maxBy(wallet, 'est')
  const average = (btc.est + min.est + max.est) / 3

  log.info({
    sell: {
      name: max.name,
      btcAmount: toShi(max.est - average),
      est: toShi(max.est),
    },
    buy: {
      name: min.name,
      btcAmount: toShi(average - min.est),
      est: toShi(min.est),
    },
    average: toShi(average),
  }, 'This is my advice!')
}

getExchangeTip()
  .then()
  .catch(err => log.error(err))
