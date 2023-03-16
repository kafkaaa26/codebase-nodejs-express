// ========================= RESPONSE CODE
const RESPONSE_CODE = {
  SUCCESS: 1,
  NOT_FOUND: 3000,
  NOT_PERMISSION: 4000,
  FAIL: 500,
  USER_FORBIDDEN: 4003,
  BAD_REQUEST: 400,
  IP_Denied: 401,
};

// ========================= MESSAGE LIST
const MESSAGE = {
  // Message success
  LOGIN_SUCCESS: "Login successfully ",
  LOGOUT_SUCCESS: "Logout successfully ",
  GET_DATA_SUCCESS: "Get data successfully ",
  INSERT_SUCCESS: "Insert data successfully ",
  UPDATE_SUCCESS: "Update data successfully ",
  DELETE_SUCCESS: "Delete data successfully ",
  REQUEST_EXPORT_SUCCESS: "Requested export report",
  // Message fail
  INTERNAL_SERVER_ERROR: "Internal server error ",
  ACCESS_DENIED: "Access denied",
  DATA_NOT_FOUND: "Data not found",
  USER_FORBIDDEN: "User Forbidden",
  CANNOT_UPDATE_QUESTION_ITEM: "Cannot update this question",
  CANNOT_DELETE_QUESTION_ITEM: "Cannot delete this question",
  BAD_REQUEST: "Bad request",
  // Message validate
  NAME_REQUIRED: "name is required",
  DATE_INCORRECT_FORMAT: "date must format YYYY-MM-DD",
  //Report message
  REPORT_PUSH_SUCCESS: "Push report successfully ",
  REPORT_PUSH_FAILED: "Push report failed ",
};

// ========================= LOG
const LOG = {
  START_API: "START : call API ",
  END_API: "END : call API ",
  CALL_SERVICE: "Call service with parameter : ",
  DATA_RESULT: "Data result : ",
  DATA_RESULT_COUNT: "Data result count: ",
};

// ========================= SQL
const SQL = {
  MAX_ROW_INSERT_1_TIME: 10000,
};

//========================= API LIST
const API_CATEGORY = {
  USER: "/user",
};

//========================= USER
const USER = {
  API: {
    USERS: "/users",
    CREATE: "/user/create",
  },
};

const DATETIME = {
  DATE_JA_FORMAT: "LL",
  MONTH_JA_FORMAT: "YYYY年MM月",
  TIME_FORMAT: "HH:mm",
  DB_TIME_FORMAT: "HH:mm:ss",
  DAY_MONTH_JA_FORMAT: "MM月DD日",

  DATE_REGEX: /[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/,
  TIME_REGEX: /[0-9]{1,2}:[0-9]{1,2}/,
  DATETIME_REGEX: /[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}\s[0-9]{1,2}:[0-9]{1,2}/,
};

const FORMAT_DATE = {
  FORMAT_1: "YYYYMMDD",
  FORMAT_2: "YYYY-MM-DD",
  FORMAT_3: "YYYY/MM/DD",
};

const FORMAT_DATETIME = {
  FORMAT_1: "YYYY-MM-DD HH:mm:ss",
  FORMAT_2: "YYYYMMDD_HHmmss",
  FORMAT_3: "YYYY-MM-DD HH:mm",
  FORMAT_4: "YYYY/MM/DD HH:mm",
};

const SQL_FORMAT_DATETIME = {
  FORMAT_1: "YYYY-MM-DD HH24:MI:SS",
};

module.exports = {
  RESPONSE_CODE,
  MESSAGE,
  LOG,
  SQL,
  API_CATEGORY,
  USER,
  DATETIME,
  FORMAT_DATE,
  FORMAT_DATETIME,
  SQL_FORMAT_DATETIME,
};
