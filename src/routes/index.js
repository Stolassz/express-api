import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import asyncRoute from './asyncRouter.js';
import authRoutes from './authRouter.js';
import userRoutes from './userRoutes.js';
import addressRoutes from './addressRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use(authenticate);
router.get('/me', asyncRoute((req, res) => res.json(authController.publicUser(req.user))));
router.use('/users', userRoutes);
router.use('/addresses', addressRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

export default router;
