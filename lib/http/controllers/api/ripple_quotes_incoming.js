const rippleQuotes    = require(__dirname + '/../../../api/ripple_quotes.js');
const responseHandler = require(__dirname + '/../../../response_handler.js');

module.exports = function(request, response) {
  var currencies = request.param('source_currencies') ? request.param('source_currencies').split(',') : [];
  rippleQuotes.getIncoming({
    source: {
      address: request.param('source_address'),
      currencies: currencies
    },
    destination: {
      amount: request.param('destination_amount'),
      currency: request.param('destination_currency')
    }
  }).then(function(rippleQuotes) {
    responseHandler.success(response, {payments: rippleQuotes});
  }).error(function(error) {
    if (error.error_type) {
      // If an error_type is returned this is an error from ripple-rest
      responseHandler.transactionError(response, null, error);
    } else {
      responseHandler.invalidRequest(response, error.message);
    }
  });
};