/**
 * ProfilePage Component
 * 
 * This component builds a user profile dashboard with two main features:
 * 1. Displays user's code execution history with detailed outputs and status
 * 2. Shows snippets that the user has starred for quick access
 * 3. Implements tab-based navigation between executions and starred snippets
 * 4. Provides infinite scroll pagination for code executions
 */

"use client";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/Components/NavigationHeader";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import { ChevronRight, Clock, Code, ListVideo, Loader2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarButton from "@/Components/StarButton";
import CodeBlock from "./_components/CodeBlock";

// Define available tabs for the profile page
const TABS = [
  {
    id: "executions",
    label: "Code Executions",
    icon: ListVideo,
  },
  {
    id: "starred",
    label: "Starred Snippets",
    icon: Star,
  },
];

function ProfilePage() {
  // Hook to access authenticated user information
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  // State to manage active tab selection
  const [activeTab, setActiveTab] = useState<"executions" | "starred">("executions");

  /**
   * Query to fetch user statistics
   * Retrieves metrics about user's code executions and activity
   */
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });

  /**
   * Query to fetch user's starred snippets
   * Gets all code snippets that the user has marked as favorite
   */
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  /**
   * Paginated query for user's code executions
   * Implements infinite scroll with initial load of 5 items
   */
  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    {
      userId: user?.id ?? "",
    },
    { initialNumItems: 5 }
  );

  /**
   * Query to fetch user profile data
   * Gets additional user information beyond authentication data
   */
  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  /**
   * Handler for loading more executions
   * Triggered when user scrolls to bottom of executions list
   */
  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  // Redirect to home if user is not authenticated
  if (!user && isLoaded) return router.push("/");

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Render Profile Header when data is available */}
        {userStats && userData && (
          <ProfileHeader userStats={userStats} userData={userData} user={user!} />
        )}

        {/* Show skeleton loader while data is loading */}
        {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

        {/* Main content container with gradient background */}
        <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl 
        shadow-black/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden">
          
          {/* Tab navigation */}
          <div className="border-b border-gray-800/50">
            {/* Tab buttons with animated selection indicator */}
            <div className="flex space-x-1 p-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "executions" | "starred")}
                  className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                    activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500/10 rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <tab.icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated tab content container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* Code Executions Tab Content */}
              {activeTab === "executions" && (
                // ... rest of the code executions rendering logic
              )}

              {/* Starred Snippets Tab Content */}
              {activeTab === "starred" && (
                // ... rest of the starred snippets rendering logic
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;