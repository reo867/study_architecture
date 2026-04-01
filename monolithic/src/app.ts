import express from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/api/tasks', taskRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({
    error: {
      message: 'API route not found.'
    }
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Monolithic TODO app running at http://localhost:${port}`);
});
