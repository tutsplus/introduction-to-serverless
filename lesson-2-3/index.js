const AWS = require('aws-sdk');
const async = require('async');

function generateAudio(text, voiceId, filename, next) {
  const Polly = new AWS.Polly();
  const params = {
    Text: text,
    TextType: 'text',
    OutputFormat: 'mp3',
    SampleRate: '22050',
    VoiceId: voiceId
  };

  Polly.synthesizeSpeech(params, function (err, data) {
    next(err, filename, data.AudioStream);
  });
}

function uploadAudioFile(filename, audio, next) {
  const S3 = new AWS.S3();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename + '.mp3',
    ACL: 'public-read',
    Body: audio
  };

  S3.upload(params, function (err, data) {
    next(err, data);
  });
}

exports.handler = function (event, context, callback) {
  async.waterfall([
    async.constant(event.text, event.voiceId, event.filename),
    generateAudio,
    uploadAudioFile
  ], function (err, data) {
    callback(err, data);
  });
};
