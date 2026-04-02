import { Task } from '../../entities/Task';

export interface HttpTaskController {
  list(req: any, res: any): Promise<void>;
  create(req: any, res: any): Promise<void>;
  update(req: any, res: any): Promise<void>;
  remove(req: any, res: any): Promise<void>;
}
