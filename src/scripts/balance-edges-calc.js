const log = require('../common/logger')

const { getApiData } = require('../services/data-service')
const { balanceEdges } = require('../services/coin-balance-service')

getApiData()
  .then(res => balanceEdges(res))
  .then(res => {
    log.info(res, 'This is my advice!')
  })
  .catch(err => log.error(err))
