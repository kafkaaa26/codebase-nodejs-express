const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const zlib = require('zlib');

const signedUrlExpireSeconds = 60 * 5;
//Set timeout upload to 5 minutes
AWS.config.httpOptions.timeout = 300000;

function putFileToS3(bucket, location, buffer) {
    let params = {
        Bucket: bucket,
        Key: location,
        Body: buffer,
        ContentType: 'binary'
    };
    return new Promise((resolve, reject) => {
        S3.putObject(params, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

async function unzipS3File(bucket, key) {
    const obj = await getObject(bucket, key);
    return zlib.unzipSync(obj.Body);
}

async function getObject(bucket, key) {
    const params = {
        Bucket: `${bucket}`,
        Key: `${key}`
    }
    return await S3.getObject(params).promise();
}
async function checkFileExistsInS3(bucket, key) {
    var params = {
        Bucket: bucket,
        Key: key
    };

    return new Promise((resolve, reject) => {
        S3.headObject(params, function (err, metadata) {
            resolve(!(err && err.code === 'NotFound'));
        });
    });
}

async function getUrlFileS3(bucket, key) {
    var params = {
        Bucket: bucket,
        Key: key
    };

    return new Promise((resolve, reject) => {
        S3.headObject(params, function (err, metadata) {
            if (err && err.code === 'NotFound') {
                reject('File not found');
            } else {
                resolve(getSignedUrl(bucket, key));
            }
        });
    });
}

function getSignedUrl(bucket, key, fileName) {
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    };
    if (fileName) {
        fileName = encodeURIComponent(fileName);
        params.ResponseContentDisposition = `attachment;filename="${fileName}"`;
    }
    return S3.getSignedUrl('getObject', params);
}

module.exports = {
    putFileToS3,
    unzipS3File,
    getObject,
    checkFileExistsInS3,
    getUrlFileS3,
    getSignedUrl,
}
