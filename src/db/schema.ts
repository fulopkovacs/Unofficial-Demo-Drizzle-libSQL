import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name"),
  email: text("email"),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users, {
  id: (s) => s.id,
  fullName: (s) => s.fullName.min(1),
  email: (s) => s.email.email(),
});

export const apiCreateUser = insertUserSchema.omit({ id: true });

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);
