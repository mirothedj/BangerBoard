import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shows").order("desc").take(50)
  },
})

export const getLiveShows = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("shows")
      .withIndex("by_live", (q) => q.eq("isLive", true))
      .order("desc")
      .take(20)
  },
})

export const getById = query({
  args: { id: v.id("shows") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const incrementLikes = mutation({
  args: { id: v.id("shows") },
  handler: async (ctx, args) => {
    const show = await ctx.db.get(args.id)
    if (!show) throw new Error("Show not found")
    await ctx.db.patch(args.id, { likeCount: show.likeCount + 1 })
  },
})
