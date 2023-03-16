const config = require("./common/config");
const logger = require("./common/logger");

module.exports.handler = async (event) => {
  logger.info(`Start param ${JSON.stringify(event)}`);
  const body = event.body;
  let returnMsg = "OK";
  switch (body.key) {
    case config.key.synchronizeData:
      // await userService.syncUsers();
      logger.info("End run job synchronize data to database ");
      break;
  }

  logger.info("Finish job.");
  // The output from a Lambda proxy integration must be
  // in the following JSON object. The 'headers' property
  // is for custom response headers in addition to standard
  // ones. The 'body' property  must be a JSON string. For
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  let response = {
    statusCode: 200,
    headers: {
      "x-custom-header": "Success",
    },
    body: JSON.stringify(returnMsg),
  };
  return response;
};
