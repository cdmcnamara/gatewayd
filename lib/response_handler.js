/**
 * Response handler (borrowed from ripple-rest)
 * Format http(s) responses and appropriate error codes
 *
 * Every response will have JSON body containing at least the `success` property
 * Responses will be accompanied by appropriate error codes
 *
 * In case of error, an error type and optional message will be supplied
 *
 *
 * HTTP Status Codes
 *
 * 200 OK - Everything worked as expected.
 * 201 Created - POST request has been accepted and resulted in successful creation.
 * 202 Accepted - Request has been accepted for processing. E.g. submitting a transaction.
 * 400 Bad Request - Invalid or malformed request. E.g. missing or invalid parameter.
 * 403 Forbidden - Unauthorized access to endpoint
 * 404 Not Found - The requested item doesn't exist.
 * 500 Internal Server Error - Unexpected condition occurred
 *
 *
 * Error Types
 *
 * invalid_request  - invalid request errors arise when the request has invalid parameters.
 * transaction      - response from rippled or internal processing error
 * server           - unexpected condition in the server occurred
 *
 */

var _ = require('lodash');

var ErrorType = {
  invalidRequest: 'invalid_request',
  transaction:    'transaction',
  server:         'server'
};

var StatusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  internalServerError: 500
};

module.exports = {
  success: success,
  created: created,
  transactionError: transactionError,
  invalidRequest: invalidRequestError,
  internalError: internalError,
  notFoundError: notFoundError
};

/**
 * Send a success response
 *
 * @param response - response object
 * @param body - (optional) body to the response, in addition to the success property
 */
function success(response, body) {

  var content =
  {
    success: true
  };

  if (body !== void(0)) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.ok);
}

/**
 * Send a created response
 *
 * @param response - response object
 * @param body - (optional) body to the response, in addition to the success property
 */
function created(response, body) {

  var content =
  {
    success: true
  };

  if (body !== void(0)) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.created);
}

/**
 * Send an transaction error response
 *
 * @param response  - response object
 * @param message   - (optional) message to accompany and describe the invalid response
 * @param body      - (optional) additional body to the response
 */
function transactionError(response, message, body) {

  var content = {
    success: false,
    error_type: ErrorType.transaction
  };

  if (message) {
    content.message = message;
  }

  if (body) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.internalServerError);
}

/**
 * Send an invalid request error response
 *
 * @param response  - response object
 * @param message   - (optional) message to accompany and describe the invalid response
 * @param body      - (optional) additional body to the response
 */
function invalidRequestError(response, message, body) {

  var content = {
    success: false,
    error_type: ErrorType.invalidRequest
  };

  if (message) {
    content.message = message;
  }

  if (body) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.badRequest);
}

/**
 * Send an internal error response
 *
 * @param response  - response object
 * @param message   - (optional) additional error message, e.g. description for provided error
 * @param body      - (optional) additional body to the response
 */
function internalError(response, message, body) {

  var content = {
    success: false,
    error_type: ErrorType.server
  };

  if (message) {
    content.message = message;
  }

  if (body) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.internalServerError);
}

/**
 * Send a not found error response
 *
 * @param response  - response object
 * @param message   - (optional) additional error message
 * @param body      - (optional) additional body to the response
 */
function notFoundError(response, message, body) {

  var content = {
    success: false,
    error_type: ErrorType.invalidRequest
  };

  if (message) {
    content.message = message;
  }

  if (body) {
    content = _.extend(content, body);
  }

  send(response, content, StatusCode.notFound);
}

/**
 * Send a JSON response
 *
 * @param response - response object
 * @param body
 * @param statusCode
 */
function send(response, body, statusCode) {
  response.status(statusCode).json(body);
}
