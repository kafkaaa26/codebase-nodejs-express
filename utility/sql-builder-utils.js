const config = require("../common/config");

function createPagingExpression(param) {
  let size = parseInt(param.size);
  let page = parseInt(param.page);
  size = size ? size : config.rds.defaultSize;
  page = page > 0 ? page : 0;
  let offset = page * size;
  return ` LIMIT ${size} OFFSET ${offset}`;
}

function addConditionAND(query, expression) {
  return expression
    ? query
      ? ` ${query} AND ${expression}`
      : ` WHERE ${expression}`
    : query;
}

/**
 * Escape character for LIKE clause
 * @param str
 * @return {*}
 */
function escapeCharForSearch(str) {
  return str.replace(/[?%\\_]/gi, function (x) {
    return "\\" + x;
  });
}

module.exports = {
  createPagingExpression,
  addConditionAND,
  escapeCharForSearch,
};
