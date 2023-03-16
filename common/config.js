/**
 * Variable have different value between dev, stg, prod environment should be declared here
 */
module.exports = {
  stage: process.env.STAGE,
  TZ: process.env.TZ,
  secret: "LMLsa_(@90dt3r1eBBybxt0CommonAuthenV3",
  key: {
    synchronizeData: "Sync.User.Data",
  },
  rds: {
    connectionString: process.env.POSTGRESQL_CONNECTSTRING,
    defaultPage: 0,
    defaultSize: 20,

    schema: process.env.NAME_SCHEMA,
    table: {
      users: "users-tbl",
    },
  },
  email: {
    sender: process.env.SENDER,
    ses_region: process.env.SES_REGION,
  },
  s3: {
    bucket: process.env.BUCKET,
  },
};
