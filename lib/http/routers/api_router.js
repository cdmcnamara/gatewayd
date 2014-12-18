var express = require('express');

var apiController = require(__dirname+'/../controllers/api/');

var router = new express.Router();

router.get('/payments/incoming', apiController.listIncomingPayments);
router.post('/payments/outgoing', apiController.enqueueOutgoingPayment);
router.get('/payments/outgoing', apiController.listOutgoingPayments);
router.get('/payments/failed', apiController.listFailedPayments);
router.post('/payments/failed/:id/retry', apiController.retryFailedPayment);
router.get('/withdrawals', apiController.listQueuedWithdrawals);
router.post('/withdrawals/:id/clear', apiController.clearWithdrawal);
router.post('/wallets/hot/fund', apiController.fundHotWallet);
router.post('/deposits', apiController.recordDeposit);
router.get('/deposits', apiController.listQueuedDeposits);
router.get('/cleared', apiController.listCleared);
router.get('/users/:id/external_accounts', apiController.listUserExternalAccounts);
router.post('/users/:id/activate', apiController.activateUser);
router.post('/users/:id/deactivate', apiController.deactivateUser);
router.post('/registrations', apiController.registerUser);
router.post('/start', apiController.startGateway);
router.get('/config/database', apiController.getDatabaseUrl);
router.post('/config/database', apiController.setDatabaseUrl);
router.get('/config/ripple/rest', apiController.getRippleRestUrl);
router.post('/config/ripple/rest', apiController.setRippleRestUrl);
router.get('/config/domain', apiController.getDomain);
router.post('/config/domain', apiController.setDomain);
router.post('/wallets/generate', apiController.generateWallet);
router.post('/config/wallets/hot', apiController.setHotWallet);
router.get('/config/wallets/hot', apiController.getHotWallet);
router.post('/config/wallets/cold', apiController.setColdWallet);
router.get('/config/wallets/cold', apiController.getColdWallet);
router.post('/wallets/hot/fund', apiController.fundHotWallet);
router.get('/config/key', apiController.getKey);
router.post('/config/key', apiController.setKey);
router.get('/currencies', apiController.listCurrencies);
router.post('/currencies', apiController.addCurrency);
router.delete('/currencies/:currency', apiController.removeCurrency);
router.post('/wallets/cold/refund', apiController.refundColdWallet);
router.get('/processes', apiController.listProcesses);
router.get('/balances', apiController.getAccountBalance);
router.get('/liabilities', apiController.getLiabilities);
router.get('/quotes/ripple/incoming', apiController.rippleQuotesIncoming);
router.get('/quotes/ripple/outgoing', apiController.rippleQuotesOutgoing);

module.exports = router;

