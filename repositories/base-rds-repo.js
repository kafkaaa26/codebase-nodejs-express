const logger = require("../common/logger");
const config = require("../common/config");
const initOptions = {
  query(e) {
    logger.verbose(e.query);
  },
};
const pgp = require("pg-promise")(initOptions);

function getDb() {
  if (!config.rds.connectionString) return;
  if (!global["db"]) global["db"] = pgp(config.rds.connectionString);
  return global["db"];
}

function getDbShiftTable() {
  if (!config.rds.connectionString) return;
  if (!global["db"]) global["db"] = pgp(config.rds.connectionString);
  return global["db"];
}

async function query(queryString, params = null, count = 0) {
  if (params) logger.verbose("Params: " + JSON.stringify(params));
  try {
    var result = await getDb().any(queryString, params);
    return result;
  } catch (error) {
    // if count < 3 loop function
    logger.debug(`Try to call query. Count: ${++count}`);
    return count < 3 ? await query(queryString, params, count) : error;
  }
}

/**
 * Executes a query that expects exactly 1 row to be returned. When 0 or more than 1 rows are returned, the method rejects.
 * When receiving a multi-query result, only the last result is processed, ignoring the rest.
 * @param query
 * @param params
 * @param callback
 * @return {Promise<*>}
 */
async function one(query, params, callback) {
  if (params) logger.verbose("Params: " + JSON.stringify(params));
  return getDb().one(query, params, callback);
}

/**
 * Executes a query that expects 0 or 1 rows to be returned. It resolves with the row-object when 1 row is returned, or with null when nothing is returned. When the query returns more than 1 row, the method rejects.
 * When receiving a multi-query result, only the last result is processed, ignoring the rest.
 * @param query
 * @param params
 * @return {Promise<*>}
 */
async function oneOrNone(queryString, params, count = 0) {
  if (params) logger.verbose("Params: " + JSON.stringify(params));
  try {
    var result = await getDb().oneOrNone(queryString, params);
    return result;
  } catch (error) {
    // if count < 3 loop function
    logger.debug(`Try to call transaction. Count: ${++count}`);
    return count < 3 ? await oneOrNone(queryString, params, count) : error;
  }
}

/**
 * use this function for Update/Delete to get affected rows over .rowCount
 * @param query
 * @param params
 * @return {Promise<pg.IResult>}
 */
async function execute(queryString, params, count = 0) {
  if (params) logger.verbose("Params: " + JSON.stringify(params));
  try {
    var result = await getDb().result(queryString, params);
    return result;
  } catch (error) {
    logger.debug(`Try to call execute query. Count: ${++count}`);
    // if count < 3 loop function
    return count < 3 ? await execute(queryString, params, count) : error;
  }
}

async function queryTransaction(tag, callback, count = 0) {
  logger.debug(`Begin Transaction [${tag}]`);

  return await getDb()
    .tx(async (t) => callback(t))
    .then((data) => {
      logger.debug(`Commit Transaction [${tag}]`);
      return data;
    })
    .catch(async (error) => {
      logger.debug(`Try to call transaction. Count: ${++count}`);
      if (count < 3) return await queryTransaction(tag, callback, count);
      logger.debug(`Rollback Transaction [${tag}]`);
      throw error;
    });
}

/**
 * insert data
 * @param params
 * @param {string[]} columns
 * @param {Object} table
 * @param {string} table.schema
 * @param {string} table.table
 * @return {Promise<*>}
 */
async function insert(params, columns, table) {
  const sql = getPgpHelper().insert(params, columns, table) + "RETURNING *";

  return await query(sql);
}

/**
 * @return {pgPromise.IHelpers}
 */
function getPgpHelper() {
  return pgp.helpers;
}

module.exports = {
  getDb,
  query,
  execute,
  queryTransaction,
  getPgpHelper,
  one,
  oneOrNone,
  insert,
};
