"use client"; // Indicates this is a client-side component in Next.js

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter"; // Remove the curly braces
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Correct path for the theme
// TypeScript interface defining the props expected by the component
interface CodeBlockProps {
  code: string;    // The actual code to be displayed
  language: string; // Programming language for syntax highlighting
}

/**
 * CodeBlock Component
 * 
 * Purpose: Displays code snippets with syntax highlighting and expand/collapse functionality
 * Features:
 * - Syntax highlighting for various programming languages
 * - Collapsible view showing first 6 lines by default
 * - Dark theme styling
 * - Responsive expand/collapse button
 * 
 * @param {CodeBlockProps} props - Component properties containing code and language
 */
const CodeBlock = ({ code, language }: CodeBlockProps) => {
  // State to track if code block is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Split code into lines for partial display
  const lines = code.split("\n");
  
  // If expanded, show all code; if collapsed, show only first 6 lines
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

  return (
    <div className="relative"> {/* Container with relative positioning for absolute button placement */}
      {/* Syntax highlighter component configuration */}
      <SyntaxHighlighter
        language={language.toLowerCase()} // Convert language to lowercase for compatibility
        style={atomOneDark} // Apply dark theme
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          background: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
          margin: 0,
        }}
      >
        {displayCode}
      </SyntaxHighlighter>

      {/* Show expand/collapse button only if code is longer than 6 lines */}
      {lines.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center 
          gap-1 hover:bg-blue-500/30 transition-colors"
        >
          {/* Conditional rendering of button text and icon based on expanded state */}
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;