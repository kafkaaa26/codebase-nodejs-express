const config = require("../common/config");
const Moment = require("moment-timezone");
const { extendMoment } = require("moment-range");
const moment = extendMoment(Moment);

const constants = require("../common/constants");
const { DATE_FORMAT, DATE_JA_FORMAT, TIME_FORMAT, DATETIME_FORMAT } =
  constants.DATETIME;

function momentTime(time) {
  return moment(time, TIME_FORMAT);
}

function momentDate(date) {
  return moment(date, DATE_FORMAT);
}

function momentDatetime(datetime) {
  return moment(datetime, DATETIME_FORMAT);
}

function timeFormat(datetime) {
  return moment(datetime).tz(config.TZ).format(TIME_FORMAT);
}

function dateFormat(datetime) {
  return moment(datetime).tz(config.TZ).format(DATE_FORMAT);
}

function dateJaFormat(datetime) {
  return moment(datetime).tz(config.TZ).locale("ja").format(DATE_JA_FORMAT);
}

/**
 * Round moment up to 30'
 * @param datetime
 * @return {moment.Moment}
 */
function round(datetime) {
  const start = moment(datetime);
  const remainder = 30 - (start.minute() % 30);

  return moment(start).add(remainder, "minutes");
}

module.exports = {
  momentDate,
  momentTime,
  momentDatetime,
  timeFormat,
  dateFormat,
  dateJaFormat,
  round,
};
