const RippleQuoteService = require('bridge-quote-service-client').RippleQuoteService;
const _                  = require('lodash');
const config             = require(__dirname + '/../../config/environment.js');
const logs               = require(__dirname + '/../data/logs.js');

var rippleQuoteService = new RippleQuoteService({
  logger: logs,
  rippleRestUrl: config.get('RIPPLE_REST_API')
});

/**
 *  Returns a RippleQuote where the destination address is the Gateway's cold wallet provided the following:
 *
 *  @param {Object} options                         - Holds various options
 *  @param {String}  [options.source.address]       - Sending ripple address
 *  @param {Array}   [options.source.currencies]    - An array of currency or currency'+'issuer values
 *  @param {String}  [options.destination.amount]   - Amount to be received by destination address
 *  @param {String}  [options.destination.currency] - Currency of amount to be received by destination address
 *
 *  @promise {Object}
 *    @resolve {Object} RippleQuote
 *    @reject  {Error}
 */
function getRippleQuoteIncoming(options) {
  return rippleQuoteService.build({
    source: options.source,
    destination: {
      address: config.get('COLD_WALLET'),
      amount: options.destination.amount,
      currency: options.destination.currency
    }
  });
}

/**
 *  Returns a RippleQuote where the source address is the Gateway's hot wallet provided the following:
 *
 *  @param {Object} options                         - Holds various options
 *  @param {String}  [options.destination.address]  - Receiving ripple address
 *  @param {String}  [options.destination.amount]   - Amount to be received by destination address
 *  @param {String}  [options.destination.currency] - Currency of amount to be received by destination address
 *
 *  @promise {Object}
 *    @resolve {Object} RippleQuote
 *    @reject  {Error}
 */
function getRippleQuoteOutgoing(options) {
  return rippleQuoteService.build({
    source: {
      address: config.get('HOT_WALLET').address,
      currencies: _.keys(config.get('CURRENCIES'))
    },
    destination: options.destination
  });
}

module.exports = {
  getIncoming: getRippleQuoteIncoming,
  getOutgoing: getRippleQuoteOutgoing
};
