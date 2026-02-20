import mysql from 'mysql2/promise';
export const db = mysql.createPool({
  host: process.env.DB_HOST,       // RDS endpoint
  user: process.env.DB_USER,       // admin
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // nextjs_db (schema name)
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default db;