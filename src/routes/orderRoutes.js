import express from 'express';
import * as controller from '../controllers/orderController.js';
import asyncRoute from './asyncRoute.js';

const router = express.Router();
router.get('/', asyncRoute(controller.list));
router.post('/', asyncRoute(controller.create));
router.get('/:id', asyncRoute(controller.get));
router.patch('/:id', asyncRoute(controller.update));

export default router;
