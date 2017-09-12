/* cspell:disable */

const wrapper = require('node.bittrex.api')
const _ = require('lodash')

const config = require('../config')
const log = require('../common/logger')

wrapper.options({
  apikey: config.bittrex.api.key,
  apisecret: config.bittrex.api.secret,
  baseUrl: 'https://bittrex.com/api/v1.1',
})

function promisify(func) {
  return options =>
    new Promise((resolve, reject) => {

      func(options, (res, err) => {
        if (err) {
          log.error(err, 'Bittrex API error')
          reject(err)
        }

        resolve(res)
      })
    })
}

for (const key of Object.keys(wrapper)) {
  if (!['option', 'websocket', 'sendCustomRequest'].includes(key)) {
    wrapper[key] = promisify(wrapper[key])
  }
}

module.exports = {
  getBalance(currency) {
    return wrapper.getbalance({ currency })
  },

  getTicker(to, from = 'BTC') {
    return wrapper.getticker({
      market: `${from}-${to}`,
    })
  },

  toShi(val) {
    return _.round(val, 8)
  },
}
