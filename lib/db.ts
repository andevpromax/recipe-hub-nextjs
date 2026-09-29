import sql from 'better-sqlite3'

const dbPath = process.env.DATABASE_PATH ?? 'meals.db'

const db = sql(dbPath)

export default db
