var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;
var Chance = require('chance');
var chance = new Chance();
var crypto = require('crypto');


/**
* seed db transactions
*
* @param {int} how_many
*/

function dbRippleTxSeed(howMany) {
  var i = howMany || 1;
  var direction = ['to-ripple', 'from-ripple'];
  while (i) {
    RippleTransactions.create({
      to_address_id: chance.integer({min: 1, max: 99999}),
      from_address_id: chance.integer({min: 1, max: 99999}),
      to_amount: chance.floating({fixed: 2}),
      to_currency: chance.currency().code,
      to_issuer: 'rHXcECnhu9JwNphxqzRDU76iydhGEftWtU',
      from_amount: chance.floating({fixed: 2}),
      from_currency: chance.currency().code,
      from_issuer: 'rwXNHZD4F6SzyE2yXhjhHZhLzMxtcXLSvt',
      invoice_id: crypto.randomBytes(32).toString('hex').toUpperCase(),
      direction: direction[chance.integer({min: 0, max: 1})]
    }).then(logFunction);
    i--;
  }
}

function logFunction() {
  console.log('successfully created transaction record');
}

module.exports = dbRippleTxSeed;
