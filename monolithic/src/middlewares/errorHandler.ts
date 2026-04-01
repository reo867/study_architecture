import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/appError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    });
    return;
  }

  res.status(500).json({
    error: {
      message: 'Internal server error.'
    }
  });
}
