import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateContentRoom = mutation({
  args: {
    topicOption: v.string(),
    tutor: v.string(),
    topic: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("contentRoom", {
      topicOption: args.topicOption,
      tutor: args.tutor,
      topic: args.topic,
    });
    return result;
  },
});
