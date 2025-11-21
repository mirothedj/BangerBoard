import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  shows: defineTable({
    title: v.string(),
    hostName: v.string(),
    hostAvatar: v.optional(v.string()),
    videoUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    viewCount: v.number(),
    likeCount: v.number(),
    rating: v.number(),
    genre: v.string(),
    isLive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_creation_time", ["createdAt"])
    .index("by_live", ["isLive", "createdAt"]),

  playlists: defineTable({
    title: v.string(),
    description: v.string(),
    coverImage: v.string(),
    genre: v.string(),
    showCount: v.number(),
    followerCount: v.number(),
    createdBy: v.string(),
    createdAt: v.number(),
  }).index("by_creation_time", ["createdAt"]),

  hosts: defineTable({
    name: v.string(),
    avatar: v.string(),
    bio: v.string(),
    verified: v.boolean(),
    showCount: v.number(),
    followerCount: v.number(),
    rating: v.number(),
    createdAt: v.number(),
  }).index("by_creation_time", ["createdAt"]),

  creators: defineTable({
    name: v.string(),
    avatar: v.string(),
    bio: v.string(),
    genre: v.string(),
    submissionCount: v.number(),
    followerCount: v.number(),
    featured: v.boolean(),
    portfolioUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_creation_time", ["createdAt"])
    .index("by_featured", ["featured", "createdAt"]),

  reviews: defineTable({
    showId: v.id("shows"),
    userId: v.string(),
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    rating: v.number(),
    comment: v.string(),
    createdAt: v.number(),
  }).index("by_show", ["showId", "createdAt"]),
})
