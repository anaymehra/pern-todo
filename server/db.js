import pg from "pg"

const db = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
});

export default db;