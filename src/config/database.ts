import {createConnection} from 'typeorm'
import path from 'path'

export async function connect() {
  await createConnection({
    type:"postgres",
    host: process.env.HOST || "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "puzzle",
    password: process.env.DB_PASSWORD || "1234567",
    database: process.env.DB_NAME || "puzzle_challenge",
    entities: [
      path.join(__dirname, '../entity/**/**.ts')
    ],
    synchronize: true
  });
  console.log('Database is Connected')
}