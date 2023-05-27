import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { z } from "zod";
import { apiCreateUser, users } from "~/db/schema";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  fetchAllUsers: publicProcedure.query(async () => {
    const client = createClient({ url: env.DATABASE_URL });
    const db = drizzle(client);
    const allUsers = await db.select().from(users).all();

    return allUsers;
  }),
  saveToDB: publicProcedure.input(apiCreateUser).mutation(async ({ input }) => {
    const client = createClient({ url: env.DATABASE_URL });
    const db = drizzle(client);
    const res = await db.insert(users).values(input).all();
    console.log(res);

    return res;
  }),
});
