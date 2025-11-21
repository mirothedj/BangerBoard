import { query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("creators").order("desc").take(20)
  },
})

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("creators")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(10)
  },
})
