/**
 * ProfileHeader Component
 * 
 * This component builds a user profile header with statistics display that includes:
 * 1. User profile information with pro status indicator
 * 2. Animated statistics cards with hover effects
 * 3. Real-time metrics for code executions, starred snippets, and language usage
 */

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Activity, Code2, Star, Timer, TrendingUp, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Id } from "../../../../convex/_generated/dataModel";
import { UserResource } from "@clerk/types";

/**
 * Interface defining the required props for the ProfileHeader component
 * Includes user statistics, user data, and Clerk user resource
 */
interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

/**
 * ProfileHeader Component
 * Displays user profile information and key statistics in an animated card layout
 * 
 * @param userStats - Object containing user activity statistics
 * @param userData - Object containing user profile data
 * @param user - Clerk user resource object
 */
function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {

  // Query to fetch user's starred snippets
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  /**
   * Configuration array for statistics cards
   * Each object defines the content and styling for a statistics card
   */
  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      gradient: "group-hover:via-blue-400",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
      },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      gradient: "group-hover:via-yellow-400",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: Trophy,
      },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: "from-purple-500 to-pink-500",
      gradient: "group-hover:via-purple-400",
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: TrendingUp,
      },
    },
  ];

  return (
    <div className="relative mb-8 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-8 border border-gray-800/50 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      
      {/* Profile section with avatar and user info */}
      <div className="relative flex items-center gap-8">
        <div className="relative group">
          {/* Avatar glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          
          {/* User avatar */}
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-800/50 relative z-10 group-hover:scale-105 transition-transform"
          />
          
          {/* Pro badge */}
          {userData.isPro && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-full z-20 shadow-lg animate-pulse">
              <Zap className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* User information */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Welcome {userData.name} to the Coditor</h1>
            {userData.isPro && (
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium">
                Pro Member
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Statistics cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {STATS.map((stat , index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
            className="group relative bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-all 
              duration-500 ${stat.gradient}`}
            />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-400">{stat.description}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Additional metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800/50">
                <stat.metric.icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">{stat.metric.label}:</span>
                <span className="text-sm font-medium text-white">{stat.metric.value}</span>
              </div>
            </div>

            {/* Interactive hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
            {/* Card content and animations */}
            {/* ... (rest of the card rendering logic) */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeader;

