import pg from "pg"

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "1234567890",
    database: "perntodo",
    port: 5432
});

export default db;