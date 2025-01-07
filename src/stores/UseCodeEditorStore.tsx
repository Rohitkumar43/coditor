/**
 * This code implements a global state management system for a code editor using Zustand.
 * It handles editor settings, code execution, and persists user preferences in localStorage.
 */

import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root-homepage)/_constant";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";

/**
 * Gets the initial state for the editor, either from localStorage or default values
 * Handles both server-side and client-side initialization
 */
const getInitialState = () => {
  // Return default values when running on server to avoid localStorage errors
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // Retrieve saved preferences from localStorage with fallback values
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "", // Stores execution output
    isRunning: false, // Tracks code execution state
    error: null, // Stores any execution errors
    editor: null, // Reference to Monaco editor instance
    executionResult: null, // Stores complete execution result

    // Returns current code from editor
    getCode: () => get().editor?.getValue() || "",

    // Initializes editor with saved code for current language
    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    // Updates editor theme and persists to localStorage
    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    // Updates font size and persists to localStorage
    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    // Handles language switching and code persistence
    setLanguage: (language: string) => {
      // Save current code before switching languages
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      // Reset output and error states for new language
      set({
        language,
        output: "",
        error: null,
      });
    },

    //Executes code using Piston API
    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      // Validate code existence
      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        // Get language runtime configuration
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        
        // Make API request to Piston execution service
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();

        console.log("data back from piston:", data);

        // Handle various error scenarios
        if (data.message) {
          set({ error: data.message, executionResult: { code, output: "", error: data.message } });
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        // Handle successful execution
        const output = data.run.output;

        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

// Utility function to access execution results from outside the store
export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;