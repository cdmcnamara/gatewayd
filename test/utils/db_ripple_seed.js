process.env.NODE_ENV = 'test_in_memory';
const crypto             = require('crypto');
var Chance               = require('chance');
var chai                 = require('chai');
const gatewayd           = require(__dirname+'/../../');
const RippleTransactions = gatewayd.models.rippleTransactions;

describe('db_ripple_seed', function() {

  var chance = new Chance();

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_transaction record with chance generated data', function(done) {
    var chanceToAddressId = chance.integer({min: 1, max: 99999}),
        chanceFromAddressId = chance.integer({min: 1, max: 99999}),
        chanceToAmount = chance.floating({fixed: 2}),
        chanceToCurrency = chance.currency().code,
        chanceFromAmount = chance.floating({fixed: 2}),
        chanceFromCurrency = chance.currency().code,
        chanceInvoiceId = crypto.randomBytes(32).toString('hex').toUpperCase();

    var chanceToIssuer;
    gatewayd.api.generateWallet(function(error, result) {
      if (error) {
        throw new Error('Unable to generate address');
      }
      chanceToIssuer = result.address;
    });

    var chanceFromIssuer;
    gatewayd.api.generateWallet(function(error, result) {
      if (error) {
        throw new Error('Unable to generate address');
      }
      chanceFromIssuer = result.address;
    });

    RippleTransactions.create({
      to_address_id: chanceToAddressId,
      from_address_id: chanceFromAddressId,
      to_amount: chanceToAmount,
      to_currency: chanceToCurrency,
      to_issuer: chanceToIssuer,
      from_amount: chanceFromAmount,
      from_currency: chanceFromCurrency,
      from_issuer: chanceFromIssuer,
      invoice_id: chanceInvoiceId,
      direction: 'to-ripple'
    }).then(function(transaction) {
      chai.assert.strictEqual(transaction.to_address_id, chanceToAddressId);
      chai.assert.strictEqual(transaction.from_address_id, chanceFromAddressId);
      chai.assert.strictEqual(transaction.to_amount, chanceToAmount);
      chai.assert.strictEqual(transaction.to_currency, chanceToCurrency);
      chai.assert.strictEqual(transaction.to_issuer, chanceToIssuer);
      chai.assert.strictEqual(transaction.from_amount, chanceFromAmount);
      chai.assert.strictEqual(transaction.from_currency, chanceFromCurrency);
      chai.assert.strictEqual(transaction.from_issuer, chanceFromIssuer);
      chai.assert.strictEqual(transaction.invoice_id, chanceInvoiceId);
      done();
    }).error(function(error) {
      done(error);
    });
  });
});
