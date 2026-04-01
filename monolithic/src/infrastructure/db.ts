import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbPromise: Promise<Database> | null = null;

export async function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const dataDir = path.join(process.cwd(), 'data');
      const dbPath = path.join(dataDir, 'app.db');

      fs.mkdirSync(dataDir, { recursive: true });

      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          completed INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        )
      `);

      return db;
    })();
  }

  return dbPromise;
}
