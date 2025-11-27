import { query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("hosts").order("desc").take(20)
  },
})
