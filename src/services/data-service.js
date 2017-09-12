const { toShi, getBalance, getTicker } = require('../utils/bittrex')
const config = require('../config')

module.exports = {

  async getApiData() {
    let balances = [getBalance('BTC')]
    let markets = []

    for (const altCoin of config.altCoins) {
      balances.push(getBalance(altCoin))
      markets.push(getTicker(altCoin))
    }

    balances = await Promise.all(balances)
    markets = await Promise.all(markets)

    return balances.map(({ result }, i) => {
      let balance = result.Available
      const currency = {
        name: result.Currency,
      }

      if (currency.name !== 'BTC') {
        const market = markets[i - 1].result
        balance *= market.Last
      }

      currency.balance = toShi(balance)

      return currency
    })
  },
}
