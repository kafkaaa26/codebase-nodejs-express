function copyObject(input) {
  return JSON.stringify(input);
}

function cloneObject(input) {
  return JSON.parse(JSON.stringify(input));
}

module.exports = {
  copyObject,
  cloneObject,
};
