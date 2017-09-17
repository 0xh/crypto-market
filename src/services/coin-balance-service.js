const _ = require('lodash')

const { toShi } = require('../utils/bittrex')

module.exports = {
  /**
   * Balance alt coins with max and min estimated BTC balance
   * @param {object[]} data All crypto currencies in wallet
   * @returns {object}
   */
  balanceEdges(data) {
    const btc = _.pullAt(data, _.findKey(data, { name: 'BTC' }))[0]
    data = _.sortBy(data, 'balance')
    const max = data[data.length - 1]
    const min = data[0]
    const average = _.meanBy([min, max, btc], 'balance')

    return {
      sell: [{
        name: max.name,
        amount: toShi(max.balance - average),
      }],
      buy: [{
        name: min.name,
        amount: toShi(average - min.balance),
      }],
    }
  },

  /**
   * Balance all alt coins in the wallet by average BTC balance
   * @param {object[]} data All crypto currencies in wallet
   * @returns {object}
   */
  balanceAll(data) {
    // TODO: Automatic buy and sell through bittrex platform
    const average = _.meanBy(data, 'balance')
    const btc = _.pullAt(data, _.findKey(data, { name: 'BTC' }))[0]
    btc.balance = {
      old: btc.balance,
      new: btc.balance,
    }
    const out = data.map(({ name, balance }) => {
      const amount = average - balance
      const item = {
        name,
        action: amount < 0 ? 'sell' : 'buy',
        balance: {
          old: balance,
        },
      }
      btc.balance.new -= amount
      item.amount = toShi(Math.abs(amount))
      item.balance.new = toShi(balance + amount)

      return item
    })
    btc.balance.new = toShi(btc.balance.new)

    return {
      atc: out,
      btc,
    }
  },
}
