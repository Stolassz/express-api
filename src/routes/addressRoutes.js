import express from 'express';
import { addresses } from '../repository/index.js';
import createController from '../controllers/resourceController.js';
import asyncRoute from './asyncRouter.js';

const controller = createController(addresses, {
  required: ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'],
  ownerField: 'userId'
});
const router = express.Router();
router.route('/').get(asyncRoute(controller.list)).post(asyncRoute(controller.create));
router.route('/:id').get(asyncRoute(controller.get)).patch(asyncRoute(controller.update)).delete(asyncRoute(controller.remove));

export default router;
