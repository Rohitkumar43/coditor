// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";

// export const syncUser = mutation({
//   args: {
//     userId: v.string(),
//     email: v.string(),
//     name: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const existingUser = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("userId"), args.userId))
//       .first();

//     if (!existingUser) {
//       await ctx.db.insert("users", {
//         userId: args.userId,
//         email: args.email,
//         name: args.name,
//         isPro: false,
//       });
//     }
//   },
// });

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * This mutation function is responsible for synchronizing user data
 * from an external authentication provider (e.g., Clerk) into the Convex database.
 * 
 * It ensures that the user information is stored in the database
 * and prevents duplicate entries by checking if the user already exists.
 */

export const syncUser = mutation({
  // Define the arguments that this mutation expects.
  args: {
    userId: v.string(), // Unique identifier for the user from the authentication provider.
    email: v.string(),  // User's email address.
    name: v.string(),   // User's display name.
  },

  /**
   * Handler function that performs the main logic of the mutation.
   * 
   * @param ctx - Context object providing access to the database and other utilities.
   * @param args - Object containing userId, email, and name provided as arguments.
   */
  handler: async (ctx, args) => {
    // Check if a user with the given userId already exists in the "users" table.
    const existingUser = await ctx.db
      .query("users") // Query the "users" table.
      .filter((q) => q.eq(q.field("userId"), args.userId)) // Filter by userId.
      .first(); // Retrieve the first matching record.

    // If the user doesn't already exist, insert a new user record.
    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId, // Store the unique user ID.
        email: args.email,   // Store the user's email.
        name: args.name,     // Store the user's name.
        isPro: false,        // Default the "isPro" flag to false (non-premium user).
      });
    }
  },
});


export const getUser = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    if (!args.userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return null;

    return user;
  },
});
