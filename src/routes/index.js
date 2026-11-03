import authRoutes from './authRouter.js'
import userRoutes from './userRoutes.js'
import express from 'express'

const router = express.Router();
router.use('/auth', authRoutes)
router.use('/users', userRoutes);

export default router;