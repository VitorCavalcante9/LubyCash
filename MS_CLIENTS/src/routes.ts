import { Router } from 'express';
import AuthController from './controllers/AuthController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import TransactionsController from './controllers/TransactionsController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.post('/auth', AuthController.authenticate);

// Forgot Password
router.post('/passwords', ForgotPasswordController.store);
router.put('/passwords', ForgotPasswordController.update);

// Transactions
router.post('/transactions', authMiddleware, TransactionsController.store);

export { router };
