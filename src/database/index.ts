import { Client } from 'pg'

export async function connectDatabase() {

    const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DB,
    })
    try {
        await client.connect();
        console.log("Connected to PostgreSQL database");
    } catch (error) {
        console.error("Connection error:", error);
    }
}
