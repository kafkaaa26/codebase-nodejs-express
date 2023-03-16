const baseRdsRepo = require("./base-rds-repo");
const config = require("../common/config");

async function getAllUsers() {
  const limitQuery = params.limit ? "LIMIT $/limit/" : "";
  const offsetQuery = params.offset ? "OFFSET $/offset/" : "";
  const dataQuery = `
    SELECT * FROM "${config.rds.schema}"."${config.rds.table.users}"
    ${limitQuery}
    ${offsetQuery};
  `;

  const totalQuery = `
    SELECT COUNT(*)::INT
    FROM "${config.rds.schema}"."${config.rds.table.users}"
  `;

  const data = await baseRepository.query(dataQuery, params);
  const total = (await baseRepository.one(totalQuery)).count;

  return { data, total };
}

async function insertAllUsers(users) {
  const helper = baseRdsRepo.getPgpHelper();
  const deleteQuery = `TRUNCATE TABLE "${config.rds.schema}"."${config.rds.table.users}"`;
  const insertQuery = helper.insert(users, ["username", "email"], {
    table: config.rds.table.users,
    schema: config.rds.schema,
  });
  await baseRdsRepo.queryTransaction("Sync User", async (tx) => {
    await tx.none(deleteQuery);
    await tx.none(insertQuery);
  });
}

module.exports = {
  getAllUsers,
  insertAllUsers,
};
