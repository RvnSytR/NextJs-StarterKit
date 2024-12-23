import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { label } from "@/components/content";

const { success, error } = label.connection;
const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

try {
  await poolConnection.query("SELECT 1");
  console.log(success);
} catch (e) {
  console.error(`${error} ${(e as Error).message}`);
}

export const db = drizzle(poolConnection);
