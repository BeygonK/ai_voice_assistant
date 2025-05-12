import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create content room
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

// get conetnt room by id
export const GetContentRoomById = query({
  args: {
    id: v.id("contentRoom"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});
