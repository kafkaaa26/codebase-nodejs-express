// parse from buffer of .gz file
function parseCsv(buffer) {
  if (!buffer) return [];

  const str = buffer.toString("utf8");
  const result = str ? str.split("\n") : [];
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].split(",");
  }
  return result;
}

module.exports = {
  parseCsv,
};
