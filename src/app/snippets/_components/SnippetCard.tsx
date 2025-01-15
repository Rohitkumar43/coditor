/**
 * SnippetCard Component
 * A React component that displays a single code snippet in a card format.
 * Features:
 * - Animated hover effects
 * - Delete functionality for snippet owners
 * - Star/favorite system
 * - Code preview
 * - Language identification
 * - Creation time display
 */

"use client"; // Marks this as a client-side component in Next.js

import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/Components/StarButton";

// Component props interface expecting a snippet object
function SnippetCard({ snippet }: { snippet: Snippet }) {
  // Get current user information from Clerk
  const { user } = useUser();
  // Setup delete mutation from Convex
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  // Track deletion state for loading indicator
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handles the snippet deletion process
   * Shows loading state and error handling
   */
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.log("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    // Wrapper with hover animation
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card links to full snippet view */}
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div
          className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl 
          border border-[#313244]/50 hover:border-[#313244] 
          transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            {/* Card Header Section */}
            <div className="flex items-start justify-between mb-4">
              {/* Language Icon and Metadata */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Gradient background effect for language icon */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 
                    group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  {/* Language icon container */}
                  <div
                    className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20
                     group-hover:to-purple-500/20 transition-all duration-500"
                  >
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-6 h-6 object-contain relative z-10"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                {/* Language badge and creation time */}
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons (Star and Delete) */}
              <div
                className="absolute top-5 right-5 z-10 flex gap-4 items-center"
                onClick={(e) => e.preventDefault()} // Prevent link navigation when clicking buttons
              >
                {/* Star/Favorite Button Component */}
                <StarButton snippetId={snippet._id} />

                {/* Delete Button - Only shown to snippet owner */}
                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
                                  ${
                                    isDeleting
                                      ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                                      : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                                  }
                                `}
                    >
                      {/* Loading spinner or delete icon */}
                      {isDeleting ? (
                        <div className="size-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Card Content Section */}
            <div className="space-y-4">
              {/* Title and Author Information */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-gray-800/50">
                      <User className="size-3" />
                    </div>
                    <span className="truncate max-w-[150px]">{snippet.userName}</span>
                  </div>
                </div>
              </div>

              {/* Code Preview Section */}
              <div className="relative group/code">
                {/* Gradient hover effect for code block */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                {/* Code preview with syntax highlighting */}
                <pre className="relative bg-black/30 rounded-lg p-4 overflow-hidden text-sm text-gray-300 font-mono line-clamp-3">
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;