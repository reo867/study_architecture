import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { SqliteTaskRepository } from '../repositories/sqliteTaskRepository';
import { TaskService } from '../services/taskService';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

const repository = new SqliteTaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.get));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;
