const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

/**
 * Returns one or more items and item attributes by accessing every item in a table or a secondary index.
 * @param {*} params
 */
function scan(params) {
    return new Promise((resolve, reject) => {
        let results = { Items: [] };
        let onScan = (err, data) => {
            if (err) {
                reject(err);
            }
            results.Items = results.Items.concat(data.Items)
            if (typeof data.LastEvaluatedKey != 'undefined') {
                params.ExclusiveStartKey = data.LastEvaluatedKey
                documentClient.scan(params, onScan)
            } else {
                resolve(results);
            }
        }
        documentClient.scan(params, onScan);
    });
}

/**
 * Returns one or more items and item attributes by accessing every item in a table or a secondary index.
 * @param {*} params
 */
function query(params) {
    return new Promise((resolve, reject) => {
        documentClient.query(params, (err, data) => {
            if (err) {
                err.isSerious = true;
                reject(err);
            }
            else resolve(data);
        });
    });
}

module.exports = {
    scan,
    query
};
