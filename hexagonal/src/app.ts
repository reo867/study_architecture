import express from 'express';
import bodyParser from 'body-parser';
import { InMemoryTaskRepository } from './adapters/secondary/inMemoryTaskRepository';
import { createTaskRouter } from './adapters/primary/expressTaskController';

const app = express();
app.use(bodyParser.json());

// Dependency injection: wire repository to controller
const repo = new InMemoryTaskRepository();
app.use('/api/tasks', createTaskRouter(repo));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Hexagonal app listening on ${port}`);
});
