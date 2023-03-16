const moment = require("moment");

function validateNullOrBlank(array) {
  array.forEach((element) => {
    if (!element || element.toString().trim() === "") return false;
  });
  return true;
}

function validateMaxlength(item, maxLength) {
  return !item || item.toString().trim().length <= maxLength;
}

function isString(value) {
  return !value || typeof value === "string";
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function isDate(value, format = "YYYY/MM/DD") {
  if (!value) return true;
  const date = moment(value, format, true);
  return date.isValid();
}

function isTime(value, format = "HH:mm") {
  if (!value) return true;
  const date = moment(value, format, true);
  return date.isValid();
}

function isEmptyOrSpaces(str) {
  return str == null || str.match(/^ *$/) !== null;
}

module.exports = {
  validateMaxlength,
  validateNullOrBlank,
  isBoolean,
  isNumber,
  isString,
  isDate,
  isTime,
  isEmptyOrSpaces,
};
