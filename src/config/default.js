/* eslint-disable no-process-env */

module.exports = {
  appName: 'crypto-market',
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
  currencies: (process.env.CURRENCIES || '').split(','),
  bittrex: {
    api: {
      key: process.env.BITTREX_API_KEY,
      secret: process.env.BITTREX_API_SECRET,
    },
  },
}
