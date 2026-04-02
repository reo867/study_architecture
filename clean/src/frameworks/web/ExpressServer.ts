import express from 'express';
import bodyParser from 'body-parser';

export function createServer(routerCallback: (app: express.Express) => void) {
  const app = express();
  app.use(bodyParser.json());

  // health
  app.get('/_health', (_, res) => res.json({ ok: true }));

  routerCallback(app);

  // generic error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  });

  return app;
}
