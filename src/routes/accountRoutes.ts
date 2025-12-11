import express from 'express';
import * as accountController from '../controllers/accountController';

const router = express.Router();

// Account routes
router.get('/info', accountController.getAccountInfo);
router.post('/deposit', accountController.deposit);
router.post('/refund', accountController.requestRefund);
router.post('/add-ledger', accountController.addLedger);
router.post('/retrieve-funds', accountController.retrieveFunds);
router.delete('/delete-ledger', accountController.deleteLedger);

export default router; 