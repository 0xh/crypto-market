const _ = require('lodash')

const { toShi } = require('../utils/bittrex')

module.exports = {
  balanceEdges(data) {
    const btc = _.pullAt(data, _.findKey(data, { name: 'BTC' }))[0]
    data = _.sortBy(data, 'balance')
    const max = data[data.length - 1]
    const min = data[0]

    const average = (min.balance + max.balance + btc.balance) / 3

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
}
