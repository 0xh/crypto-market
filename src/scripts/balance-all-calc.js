const log = require('../common/logger')

const { getApiData } = require('../services/data-service')
const { balanceAll } = require('../services/coin-balance-service')

getApiData()
  .then(res => balanceAll(res))
  .then(res => {
    log.info(res, 'Balance this!')
  })
  .catch(err => log.error(err))
