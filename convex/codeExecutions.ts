/**
 * Backend API Functions for Code Execution Platform
 * 
 * This module provides the core backend functionality for:
 * - Saving and managing code executions
 * - User statistics and analytics
 * - Pagination and data access control
 * - Pro subscription feature management
 */

import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

/**
 * Mutation to save a new code execution
 * Validates user authentication and pro status before saving
 * Handles both successful executions and errors
 * 
 * @param language - Programming language of the execution
 * @param code - Source code that was executed
 * @param output - Optional successful execution output
 * @param error - Optional error message if execution failed
 */
export const saveExecution = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    // Optional fields for execution results
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify user authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    // Check user's pro status for language restrictions
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    // Enforce pro subscription requirement for non-JavaScript languages
    if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError("Pro subscription required to use this language");
    }

    // Save the execution record
    await ctx.db.insert("codeExecutions", {
      ...args,
      userId: identity.subject,
    });
  },
});

/**
 * Query to fetch paginated user executions
 * Returns executions sorted by most recent first
 * Supports infinite scroll through pagination
 * 
 * @param userId - ID of the user whose executions to fetch
 * @param paginationOpts - Options for pagination (limit, cursor)
 */
export const getUserExecutions = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("codeExecutions")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

/**
 * Query to get comprehensive user statistics
 * Analyzes user's code executions and starred snippets
 * Provides insights into user's coding patterns and preferences
 * 
 * @param userId - ID of the user whose stats to calculate
 * @returns Object containing various usage statistics
 */
export const getUserStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Fetch all user's code executions
    const executions = await ctx.db
      .query("codeExecutions")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Fetch user's starred snippets
    const starredSnippets = await ctx.db
      .query("stars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get detailed information about starred snippets
    const snippetIds = starredSnippets.map((star) => star.snippetId);
    const snippetDetails = await Promise.all(snippetIds.map((id) => ctx.db.get(id)));

    // Calculate statistics for starred languages
    const starredLanguages = snippetDetails.filter(Boolean).reduce(
      (acc, curr) => {
        if (curr?.language) {
          acc[curr.language] = (acc[curr.language] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // Determine most starred programming language
    const mostStarredLanguage =
      Object.entries(starredLanguages).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "N/A";

    // Calculate recent activity (last 24 hours)
    const last24Hours = executions.filter(
      (e) => e._creationTime > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    // Calculate language usage statistics
    const languageStats = executions.reduce(
      (acc, curr) => {
        acc[curr.language] = (acc[curr.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Determine favorite language based on usage
    const languages = Object.keys(languageStats);
    const favoriteLanguage = languages.length
      ? languages.reduce((a, b) => (languageStats[a] > languageStats[b] ? a : b))
      : "N/A";

    // Return comprehensive stats object
    return {
      totalExecutions: executions.length,
      languagesCount: languages.length,
      languages: languages,
      last24Hours,
      favoriteLanguage,
      languageStats,
      mostStarredLanguage,
    };
  },
});