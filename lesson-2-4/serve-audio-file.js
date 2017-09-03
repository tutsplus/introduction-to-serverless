exports.handler = (event, context, callback) => {
  callback(null, { location: 'https://s3.amazonaws.com/' + process.env.BUCKET_NAME + '/' + event.key });
};
