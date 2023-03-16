const moment = require("moment");

const groupByArray = (objectArray, property) => {
  return objectArray.reduce(function (total, obj) {
    let key = obj[property];
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
  }, {});
};

function createDateRange(
  startDate,
  endDate,
  inputFormat = "YYYY/MM/DD",
  outputFormat = null
) {
  startDate = moment(startDate, inputFormat);
  endDate = moment(endDate, inputFormat);

  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (outputFormat) {
      dateArray.push(currentDate.format(outputFormat));
    } else {
      dateArray.push(currentDate.clone());
    }
    currentDate = currentDate.add(1, "d");
  }
  return dateArray;
}

function crossJoin(firstArray, secondArray, outExpression) {
  const output = [];
  for (const arr1 of firstArray)
    for (const arr2 of secondArray) {
      output.push(outExpression(arr1, arr2));
    }
  return output;
}

module.exports = {
  groupByArray,
  createDateRange,
  crossJoin,
};
