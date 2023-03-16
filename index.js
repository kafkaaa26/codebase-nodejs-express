const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./controllers/user-controller");
const authService = require("./services/auth-service");

const constants = require("./common/constants");
const moment = require("moment-timezone");
moment().tz(process.env.TZ).format();

// Allow cross origin resource sharing
app.use(cors());

// Limit request body
app.use(
  bodyParser.json({
    limit: "10mb",
    extended: true,
  })
);
// Limit request URL
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// check health
app.get("/", function (req, res) {
  res.send("App start Okey!");
});

/**
 * Validate middleware before send data to controller
 */
app.use(async (req, res, next) => {
  const currentUser = authService.commonAuthenticateToken(req, res);

  req.token = currentUser.token;
  req.user = currentUser.user;

  next();
});

app.use(constants.API_CATEGORY.USER, userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found",
  });
});
// Convert request object before send to controller

// Handle error - HTTP response is not 200
app.use(async (err, req, res) => {
  if (err.name === "UnauthorizedError") {
    // Do something here if need
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else if (err.name === "BadRequestError") {
    // Do something here if need
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } else {
    // Do something here if need
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports.handler = serverless(app);
