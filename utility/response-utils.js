const Response = require("../common/response");
const ResponsePageList = require("../common/response-page-list");
const Constants = require("../common/constants");

function createResponseSuccess(message, data) {
  return new Response(Constants.RESPONSE_CODE.SUCCESS, message, data);
}

function createResponsePageListSuccess(message, data, page, size, total) {
  return new ResponsePageList(
    Constants.RESPONSE_CODE.SUCCESS,
    message,
    data,
    page,
    size,
    total
  );
}

function createResponseNotFound(message) {
  return new Response(Constants.RESPONSE_CODE.NOT_FOUND, message, null);
}

function createResponseNotPermission(message) {
  return new Response(Constants.RESPONSE_CODE.NOT_PERMISSION, message, null);
}

function createResponseError(message, data) {
  return new Response(Constants.RESPONSE_CODE.FAIL, message, data);
}

function createResponseBadRequest(message, data) {
  return new Response(Constants.RESPONSE_CODE.BAD_REQUEST, message, data);
}

function createResponse(code, message, data) {
  return new Response(code, message, data);
}

function createError500(res) {
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = {
  createResponseSuccess,
  createResponsePageListSuccess,
  createResponseNotFound,
  createResponseNotPermission,
  createResponseError,
  createResponseBadRequest,
  createError500,
  createResponse,
};
