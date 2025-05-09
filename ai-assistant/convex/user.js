// /convex/users.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    const data = {
      name: args.name,
      email: args.email,
      credits: 50000,
    };

    if (existingUser.length === 0) {
      const result = await ctx.db.insert("users", data);
      console.log("User created:", result);
      return result;
    }

    return existingUser[0];
  },
});
