import express from 'express';
import asyncRoute from './asyncRouter.js';
import * as controller from '../controllers/authController.js';

const router = express.Router();
router.post('/register', asyncRoute(controller.register));
router.post('/login', asyncRoute(controller.login));

export default router;
