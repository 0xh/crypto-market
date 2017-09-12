/* eslint-disable no-process-env */

module.exports = {
  appName: 'crypto-market',
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
  altCoins: (process.env.ALT_COINS || '').split(','),
  bittrex: {
    api: {
      key: process.env.BITTREX_API_KEY,
      secret: process.env.BITTREX_API_SECRET,
    },
  },
}
