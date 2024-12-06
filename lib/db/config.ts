import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const db = drizzle(poolConnection);
