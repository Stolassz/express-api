import createResourceController from '../controllers/resourceController.js';
import { requireAdmin } from '../middlewares/auth.js';
import { users } from '../repository/index.js';
import asyncRouter from './asyncRouter.js';
import express from 'express'

const router = express.Router();
const controller = createResourceController(users);

router.get('/', requireAdmin, asyncRouter(controller.list));
router.get('/:id', requireAdmin, asyncRouter(controller.get));
router.patch('/:id', requireAdmin, asyncRouter(controller.update));
router.delete('/:id', requireAdmin, asyncRouter(controller.remove));

export default router;