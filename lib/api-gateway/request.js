var config = require('../config');
var https = require('https');
var aws4  = require('aws4');

module.exports = function(opts, callback){
  aws4.sign(opts, { accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY });
  return https.request(opts, function(response) {
    var body = '';
    response.on('data', function(d) { body += d; });
    response.on('end', function() {
      callback(JSON.parse(body));
    });
  }).end(opts.body || '');
};