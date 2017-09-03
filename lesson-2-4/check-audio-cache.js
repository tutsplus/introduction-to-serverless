const AWS = require('aws-sdk');

const S3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  let filename = event.filename;
  let text = event.text;
  let language = event.language || 'en-US';

  S3.getObject({
    Bucket: process.env.BUCKET_NAME,
    Key: filename + '.mp3'
  }, function (err, data) {
    if (err) {
      callback(null, { isCached: false, filename, text, language });
    } else {
      callback(null, { isCached: true, key: filename + '.mp3' });
    }
  });
};
