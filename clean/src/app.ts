import { createServer } from './frameworks/web/ExpressServer';
import { createTaskRepository } from './frameworks/persistence';
import { TaskUseCase } from './usecases/TaskUseCase';
import { createExpressTaskController } from './frameworks/web/ExpressTaskController';

const repo = createTaskRepository();
const usecase = new TaskUseCase(repo);
const controller = createExpressTaskController(usecase);

const app = createServer((app) => {
  app.get('/api/tasks', controller.list);
  app.post('/api/tasks', controller.create);
  app.put('/api/tasks/:id', controller.update);
  app.delete('/api/tasks/:id', controller.remove);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
