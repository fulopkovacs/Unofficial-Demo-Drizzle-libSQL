import { z } from "zod";
import { apiCreateUser, users } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  fetchAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.drizzleDb.select().from(users).all();

    return allUsers;
  }),
  saveToDB: publicProcedure
    .input(apiCreateUser)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.drizzleDb
        .insert(users)
        .values(input)
        .returning({ insertedId: users.id })
        .all();

      return res;
    }),
});
