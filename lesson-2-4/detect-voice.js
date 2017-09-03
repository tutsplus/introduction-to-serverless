const AWS = require('aws-sdk');

const Polly = new AWS.Polly();

exports.handler = (event, context, callback) => {
  let filename = event.filename;
  let text = event.text;
  let language = event.language;

  Polly.describeVoices({ languageCode: language }, function (err, data) {
    if (err || data.length === 0) {
      callback(null, { voiceId: 'Joanna', filename, text });
    } else {
      callback(null, { voiceId: data.Voices[0].Id, filename });
    }
  });
};
