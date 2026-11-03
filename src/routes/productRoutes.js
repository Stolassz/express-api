import express from 'express';
import { requireAdmin } from '../middlewares/auth.js';
import controller from '../controllers/productController.js';
import asyncRoute from './asyncRoute.js';

const router = express.Router();
router.get('/', asyncRoute(controller.list));
router.get('/:id', asyncRoute(controller.get));
router.post('/', requireAdmin, asyncRoute(controller.create));
router.patch('/:id', requireAdmin, asyncRoute(controller.update));
router.delete('/:id', requireAdmin, asyncRoute(controller.remove));

export default router;
