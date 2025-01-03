import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - Stores user information and subscription status
  users: defineTable({
    userId: v.string(), // Clerk authentication ID - used to link with Clerk auth system
    email: v.string(), // User's email address
    name: v.string(), // User's display name
    isPro: v.boolean(), // Premium subscription status flag
    proSince: v.optional(v.number()), // Timestamp when user upgraded to Pro (if applicable)
    lemonSqueezyCustomerId: v.optional(v.string()), // Integration with LemonSqueezy payment system
    lemonSqueezyOrderId: v.optional(v.string()), // Track specific orders in LemonSqueezy
  }).index("by_user_id", ["userId"]), // Index to quickly look up users by their Clerk ID

  // Code Executions table - Tracks code runs and their results
  codeExecutions: defineTable({
    userId: v.string(), // Who ran the code
    language: v.string(), // Programming language (e.g., 'python', 'javascript')
    code: v.string(), // The actual code that was executed
    output: v.optional(v.string()), // Success output from code execution
    error: v.optional(v.string()), // Error message if execution failed
  }).index("by_user_id", ["userId"]), // Index to fetch all executions by a user

  // Snippets table - Stores saved code snippets
  snippets: defineTable({
    userId: v.string(), // Creator of the snippet
    title: v.string(), // Title/name of the snippet
    language: v.string(), // Programming language of the snippet
    code: v.string(), // The actual code content
    userName: v.string(), // Denormalized user name for quick access without joins
  }).index("by_user_id", ["userId"]), // Index to fetch all snippets by a user

  // Snippet Comments table - Handles discussions on code snippets
  snippetComments: defineTable({
    snippetId: v.id("snippets"), // References the snippet being commented on
    userId: v.string(), // Comment author's ID
    userName: v.string(), // Denormalized user name for quick display
    content: v.string(), // HTML content of the comment (rich text)
  }).index("by_snippet_id", ["snippetId"]), // Index to fetch all comments for a snippet

  // Stars table - Manages snippet favorites/bookmarks
  stars: defineTable({
    userId: v.string(), // User who starred the snippet
    snippetId: v.id("snippets"), // Referenced snippet
  })
    .index("by_user_id", ["userId"]) // Find all snippets starred by a user
    .index("by_snippet_id", ["snippetId"]) // Find all users who starred a snippet
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]), // Check if a user starred a specific snippet
});