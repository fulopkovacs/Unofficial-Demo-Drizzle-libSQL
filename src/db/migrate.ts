import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzleDb } from "~/server/db";

void migrate(drizzleDb, { migrationsFolder: "./src/db/migrations" });
