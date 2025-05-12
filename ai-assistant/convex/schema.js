import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    credits: v.number(),
    subscriptionId: v.optional(v.string()),
  }),
  contentRoom: defineTable({
    topicOption: v.string(),
    tutor: v.string(),
    topic: v.string(),
    conversation: v.optional(v.any()),
  }),
});
