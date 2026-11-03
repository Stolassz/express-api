import express from 'express';
import * as controller from '../controllers/cartController.js';
import asyncRoute from './asyncRouter.js';

const router = express.Router();
router.get('/', asyncRoute(controller.getCart));
router.post('/items', asyncRoute(controller.addItem));
router.patch('/items/:productId', asyncRoute(controller.updateItem));
router.delete('/items/:productId', asyncRoute(controller.removeItem));
router.delete('/', asyncRoute(controller.clear));

export default router;
