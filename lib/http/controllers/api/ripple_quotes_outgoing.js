const rippleQuotes    = require(__dirname+'/../../../api/ripple_quotes.js');
const responseHandler = require(__dirname + '/../../../response_handler.js');

module.exports = function(request, response) {
  rippleQuotes.getOutgoing({
    destination: {
      address: request.param('destination_address'),
      amount: request.param('destination_amount'),
      currency: request.param('destination_currency')
    }
  }).then(function(rippleQuote) {
    responseHandler.success(response, rippleQuote);
  }).error(function(error) {
    if (error.error_type) {
      // If an error_type is returned this is an error from ripple-rest
      responseHandler.transactionError(response, null, error);
    } else {
      responseHandler.invalidRequest(response, error.message);
    }
  });
};