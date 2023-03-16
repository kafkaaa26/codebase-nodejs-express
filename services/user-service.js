const _ = require("lodash");

const logger = require("../common/logger");
const constants = require("../common/constants");
const responseUtils = require("../utility/response-utils");
const userRepo = require("../repositories/user-repo");
const config = require("../common/config");

const log = constants.LOG;
const mess = constants.MESSAGE;

async function getUsers(request) {
  logger.info(log.CALL_SERVICE);
  logger.info(JSON.stringify());
  try {
    request.page =
      !request.page || isNaN(parseInt("" + request.page))
        ? config.rds.defaultPage
        : parseInt("" + request.page) - 1;
    request.size =
      !request.size || isNaN(parseInt("" + request.size))
        ? config.rds.defaultSize
        : parseInt("" + request.size);
    request.offset = request.page * request.size;

    const { data, total } = await userRepo.getAllUsers({
      page: request.page,
      size: request.size,
      offset: request.offset,
    });

    logger.info(log.DATA_RESULT_COUNT + total);
    return responseUtils.createResponsePageListSuccess(
      mess.GET_DATA_SUCCESS,
      data,
      request.page + 1,
      request.size,
      total
    );
  } catch (error) {
    logger.error(mess.INTERNAL_SERVER_ERROR + error.stack);
    return responseUtils.createResponseError(mess.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getUsers,
};
