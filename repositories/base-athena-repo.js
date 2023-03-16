const logger = require('../common/logger');
const config = require('../common/config');
const AthenaExpress = require('athena-express');
const aws = require('aws-sdk');
aws.config.update(config.awsCredentials);
const athenaExpressConfig = {
  aws,
  s3: config.athena.log,
  getStats: true
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);

async function queryAthena(query) {
  logger.info('Query data from Athena : ' + query);
  const result = await athenaExpress.query(query)
  logger.info(`Query success, DataScannedInMB: ${result.DataScannedInMB}, QueryCostInUSD: ${result.QueryCostInUSD}`);
  return result;
}

module.exports = {
  queryAthena
};
