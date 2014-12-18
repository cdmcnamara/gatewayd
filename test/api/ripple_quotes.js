var sinon              = require('sinon');
var RippleQuoteService = require('bridge-quote-service-client').RippleQuoteService;
var Promise            = require('bluebird');
var chai               = require('chai');
var chaiAsPromised     = require('chai-as-promised');
var rippleQuotes       = require(__dirname + '/../../lib/api/ripple_quotes.js');
var gatewayd           = require(__dirname + '/../../');
var walletsFixture     = require(__dirname + '/../fixtures/wallets.js');
var fixture            = require(__dirname + '/../fixtures/ripple_quotes.js');

describe('Ripple Quotes API', function() {

  chai.use(chaiAsPromised);

  before(function() {
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('HOT_WALLET').returns(walletsFixture.HOT_WALLET);
    configStub.withArgs('COLD_WALLET').returns(walletsFixture.COLD_WALLET);
    configStub.withArgs('CURRENCIES').returns(['USD', 'XRP']);
  });

  it('should call rippleQuoteService with destination address as the gateway\'s cold wallet (incoming)', function(done) {
    var stub = sinon.stub(RippleQuoteService.prototype, 'build').returns(Promise.resolve({}));
    try {
      rippleQuotes.getIncoming(fixture.valid.incoming).then(function () {
        chai.assert.ok(stub.withArgs({
          source: {
            address: walletsFixture.HOT_WALLET_2,
            currencies: ['USD']
          },
          destination: {
            address: gatewayd.config.get('COLD_WALLET'),
            amount: 1.00,
            currency: 'USD'
          }
        }));
        done();
      }).error(done);
    } finally {
      stub.restore();
    }
  });

  it('should call rippleQuoteService with source address as the gateway\'s hot wallet (outgoing)', function(done) {
    var stub = sinon.stub(RippleQuoteService.prototype, 'build').returns(Promise.resolve({}));
    try {
      rippleQuotes.getOutgoing(fixture.valid.outgoing).then(function () {
        chai.assert.ok(stub.withArgs({
          source: {
            address: gatewayd.config.get('HOT_WALLET'),
            currencies: ['USD', 'XRP']
          },
          destination: {
            address: walletsFixture.COLD_WALLET_2,
            amount: 1.00,
            currency: 'USD'
          }
        }));
        done();
      }).error(done);
    } finally {
      stub.restore();
    }
  });

  it('should return a rejected promise if an error in RippleQuoteService occurs (incoming)', function() {
    var stub = sinon.stub(RippleQuoteService.prototype, 'build').returns(Promise.reject(new Error('Destination amount is not a valid number')));
    try {
      return chai.assert.isRejected(rippleQuotes.getIncoming(fixture.invalid.incoming), 'Destination amount is not a valid number');
    } finally {
      stub.restore();
    }
  });

  it('should return a rejected promise if an error in RippleQuoteService occurs (incoming)', function() {
    var stub = sinon.stub(RippleQuoteService.prototype, 'build').returns(Promise.reject(new Error('Source address is not a valid ripple address')));
    try {
      return chai.assert.isRejected(rippleQuotes.getOutgoing(fixture.invalid.outgoing), 'Source address is not a valid ripple address');
    } finally {
      stub.restore();
    }
  });

  after(function() {
    gatewayd.config.get.restore();
  });

});
