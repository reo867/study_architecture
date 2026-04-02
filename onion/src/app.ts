import express from "express";
import { InMemoryTaskRepository } from "./adapters/outbound/InMemoryTaskRepository";
import { TaskService } from "./application/TaskService";
import { createTaskRouter } from "./adapters/inbound/ExpressTaskController";

const app = express();
const port = process.env.PORT || 3000;

const repo = new InMemoryTaskRepository();
const service = new TaskService(repo);

app.use("/api", createTaskRouter(service));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
