import { Router } from 'express';
import { SqliteTaskRepository } from '../data/sqliteTaskRepository';
import { asyncHandler } from './asyncHandler';
import { TaskController } from './taskController';

const router = Router();

const repository = new SqliteTaskRepository();
const controller = new TaskController(repository);

router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.get));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;
