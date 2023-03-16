const winston = require("winston");
const constants = require("./constants");
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({ format: constants.FORMAT_DATETIME.FORMAT_1 }),
    winston.format.align(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;
      return `${timestamp} [${level}]: ${message}${formatMeta(meta)}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

const formatMeta = (meta) => {
  const splat = meta[Symbol.for("splat")];
  if (splat && splat.length) {
    return (
      " " +
      splat
        .map((s) => (typeof s === "string" ? s : JSON.stringify(s)))
        .join(" ")
    );
  }
  return "";
};

module.exports = logger;
