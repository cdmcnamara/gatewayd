var walletsFixture = require (__dirname + '/wallets.js');

module.exports = {
  valid: {
    incoming: {
      source: {
        address: walletsFixture.HOT_WALLET_2,
        currencies: ['USD']
      },
      destination: {
        amount: 1.00,
        currency: 'USD'
      }
    },
    outgoing: {
      destination: {
        address: walletsFixture.COLD_WALLET_2,
        amount: 1.00,
        currency: 'USD'
      }
    }
  },
  invalid: {
    incoming: {
      source: {
        address: walletsFixture.HOT_WALLET_2,
        currencies: ['USD']
      },
      destination: {
        currency: 'USD'
      }
    },
    outgoing: {
      destination: {
        address: walletsFixture.COLD_WALLET_2,
        amount: 1.00,
        currency: 'USD'
      }
    }
  }
};