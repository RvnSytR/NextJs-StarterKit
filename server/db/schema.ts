import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

//#region // * Column Attributes
const role = ["user", "admin", "pending"] as const;
type Role = (typeof role)[number];
//#endregion

//#region // * Tables
const user = mysqlTable("user", {
  id_user: varchar("id_user", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  role: mysqlEnum("role", role).notNull().default("pending"),
  last_signin_at: timestamp("last_signin_at"),
  created_at: timestamp("created_at").notNull(),
});

type UserCredentials = Omit<typeof user.$inferSelect, "password">;
//#endregion

export { role, user };
export type { Role, UserCredentials };
