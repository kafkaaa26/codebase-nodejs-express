const express = require("express");
const router = express.Router();
const constants = require("../common/constants");
const logger = require("../common/logger");
const userService = require("../services/user-service");
const responseUtils = require("../utility/response-utils");
const Joi = require("joi");

const root_path = constants.API_CATEGORY.USER;
const user = constants.USER;
const log = constants.LOG;

/**
 * Get all users
 */
router.get(user.API.GET_SETTING, async (req, res) => {
  let logStart = `=====${log.START_API} ${root_path}${user.API.GET_SETTING}=====`;
  let logEnd = `=====${log.END_API} ${root_path}${user.API.GET_SETTING}=====`;
  logger.info(logStart);
  try {
    const $body = req.query;
    // Validate
    const schema = Joi.object({
      page: Joi.number().optional(),
      size: Joi.number().optional(),
    });

    const { value, error } = schema.validate($body, { stripUnknown: true });
    if (error) {
      return res.json(
        responseUtils.createResponseError(
          error.details.map((e) => e.message).join()
        )
      );
    }

    // Call service
    const response = await userService.getUsers(value);
    return res.json(response);
  } catch (error) {
    logger.error(error.stack);
    return responseUtils.createError500(res);
  } finally {
    logger.info(logEnd);
  }
});
