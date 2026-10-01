import sql from 'better-sqlite3'
const dbPath = process.env.DATABASE_PATH ?? 'meals.db'
const db = sql(dbPath)

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  )
`,
).run()

db.close()

console.log('Database initialized')
