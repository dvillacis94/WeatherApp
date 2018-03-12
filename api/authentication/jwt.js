// Import Request Module
const request = require('request');
//
const user = require('../../test/user');

/**
 * Wrapper for API Gateway SDK
 */
class JWT {

  constructor() {
    // Init Authentication Class
    this._apiKey = 'Qy0HPNdvqH9vUVBcafB2Z85v7ohQo4ud165EKw8r';
    // Encode URL
    this._encodeURL = "https://5ypvzh8zkk.execute-api.us-east-1.amazonaws.com/prod/jwt/encode";
    // Decode URL
    this._decodeURL = "https://5ypvzh8zkk.execute-api.us-east-1.amazonaws.com/prod/jwt/decode/";
  }

  encode( body, callback ) {
    // Set Request Options
    let options = {
      method  : 'POST',
      url     : this._encodeURL,
      headers : {
        'Content-Type' : 'application/json',
        'x-api-key'    : this._apiKey
      },
      json    : true,
      body    : body
    };
    // Make Post Request
    request(options, ( error, response, body ) => {
      // Check if Errors
      if (response.statusCode >= 400 && response.statusCode < 500) {
        // Trigger Callback with Error
        callback({
          statusCode : response.statusCode,
          message    : body.message
        }, null)
      } else {
        // Trigger Callback with Body
        callback(null, {
          statusCode : response.statusCode,
          message    : body.message
        })
      }
    });
  }
}

module.exports = JWT;