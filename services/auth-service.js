const jwt = require("jsonwebtoken");
const config = require("../common/config");
const logger = require("../common/logger");

const commonAuthenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, config.secret);
  } catch (error) {
    logger.error(error);
    throw error;
  }

  return {
    token,
    user: decoded,
  };
};

module.exports = {
  commonAuthenticateToken,
};
