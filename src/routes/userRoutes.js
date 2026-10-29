import createResourceController from '../controllers/resourceController.js';
import { users } from '../repository/index.js';
import asyncRouter from './asyncRouter.js';
import express from 'express'

const router = express.Router();
const controller = createResourceController(users);

router.get('/', asyncRouter(controller.list));
router.get('/:id', asyncRouter(controller.get));
router.patch('/:id', asyncRouter(controller.update));
router.delete('/:id', asyncRouter(controller.remove));

export default router;