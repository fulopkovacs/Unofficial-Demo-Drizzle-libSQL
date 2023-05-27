import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { env } from "~/env.mjs";

const client = createClient({ url: env.DATABASE_URL });
const db = drizzle(client);

void migrate(db, { migrationsFolder: "./src/db/migrations" });
