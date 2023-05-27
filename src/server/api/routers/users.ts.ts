import { apiCreateUser, users } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.drizzleDb.select().from(users).all();

    return allUsers;
  }),
  createNewUser: publicProcedure
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
