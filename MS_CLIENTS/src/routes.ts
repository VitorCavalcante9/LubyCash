import { Router } from 'express';
import AuthController from './controllers/AuthController';
import ClientsController from './controllers/ClientsController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import TransactionsController from './controllers/TransactionsController';
import adminMiddleware from './middlewares/adminMiddleware';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.post('/auth', AuthController.authenticate);

// Forgot Password
router.post('/passwords', ForgotPasswordController.store);
router.put('/passwords', ForgotPasswordController.update);

// Transactions
router.post('/transactions', authMiddleware, TransactionsController.store);

// Clients
router.get('/clients', adminMiddleware, ClientsController.index);

export { router };
