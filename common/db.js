module.exports = {
  host: process.env.DB_HOST || "",
  database: process.env.DB_DATABASE || "",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
};
