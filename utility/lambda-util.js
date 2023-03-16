const AWS = require("aws-sdk");
const logger = require("../common/logger");

const lambda = new AWS.Lambda();

async function invoke(fn, params) {
  logger.info("Invoke Function", fn, JSON.stringify(params));
  return await lambda
    .invoke({
      FunctionName: fn,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(params),
    })
    .promise();
}

async function invokeAsync(fn, params) {
  logger.info("Invoke Async Function", fn, JSON.stringify(params));
  return await lambda
    .invoke({
      FunctionName: fn,
      InvocationType: "Event",
      Payload: JSON.stringify(params),
    })
    .promise();
}

module.exports = {
  invoke,
  invokeAsync,
};
