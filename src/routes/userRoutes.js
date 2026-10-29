import express from 'express';
import asyncRouter from './asyncRouter.js';
import { users } from '../repository/index.js';
import createResourceController from '../controllers/resourceController.js';


const router = express.Router();
const controller = createResourceController(users);

router.get('/', asyncRouter(controller.list));
router.get('/:id', asyncRouter(controller.get));
router.patch('/:id', asyncRouter(controller.update));
router.delete('/:id', asyncRouter(controller.remove));

export default router;