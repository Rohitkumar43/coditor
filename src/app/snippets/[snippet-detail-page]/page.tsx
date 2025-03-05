

/**
 * SnippetDetailPage component fetches and displays the details of a code snippet including its metadata, source code, and comments.
 * 
 * @component
 * 
 * @description
 * This component uses the `useQuery` hook from `convex/react` to fetch the snippet details and comments based on the snippet ID obtained from the URL parameters.
 * It displays a loading skeleton while the data is being fetched. Once the data is available, it renders the snippet details including the title, language, author, creation date, and the source code using the Monaco Editor.
 * It also includes a copy button to copy the source code and a comments section to display and add comments related to the snippet.
 * 
 * @returns {JSX.Element} The rendered component displaying the snippet details, source code, and comments.
 */

// "use client";

// import { useQuery } from "convex/react";
// import { useParams } from "next/navigation";
// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";
// import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
// import NavigationHeader from "@/Components/NavigationHeader";
// import { Clock, Code, MessageSquare, User } from "lucide-react";
// import { Editor } from "@monaco-editor/react";
// import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root-homepage)/_constant";
// import CopyButton from "./_components/CopyButton";
// import Comments from "./_components/Comments";

// /**
//  * Fetches the snippet ID from the URL parameters.
//  */
// function SnippetDetailPage() {

//     const params = useParams();
    
//     // Get and validate the snippet ID
//     const rawSnippetId = params?.['snippet-detail-page'];
//     console.log("Raw params:", params);
    
//     // Direct cast of the string ID to Convex ID
//     const snippetId = rawSnippetId as Id<"snippets">;
//     console.log("Cast snippet ID:", snippetId);

//     // Make the query with the ID
//     const snippet = useQuery(api.snippets.getSnippetById, {
//         snippetId: snippetId
//     });
//     console.log("Snippet data:", snippet);







    // const params = useParams();

    // // Debug the raw params first
    // console.log("Raw params:", params);
    

    // const rawSnippetId = params['snippet-details-page']

    // console.log("raw snippetif id " ,  rawSnippetId)



    /**
     * Fetches the snippet details using the snippet ID.
     */
    //const snippet = useQuery(api.snippets.getSnippetById, { //snippetId: snippetId as Id<"snippets"> });


    // Add null check before querying
    // const snippet = useQuery(api.snippets.getSnippetById, 
    //     snippetId ? { 
    //         snippetId: snippetId as Id<"snippets">
    //     } : "skip"
    // );

    // const snippet = useQuery(api.snippets.getSnippetById, {
    //     snippetId: snippetId as Id<"snippets">
    // });


    // Only make the query if we have a valid ID
    // Cast the ID to Convex ID type if it exists
    // const snippetId = rawSnippetId ? (rawSnippetId as Id<"snippets">) : null;
    // console.log("Processed snippet ID:", snippetId);

    // // Use the snippet ID in the query
    // const snippet = useQuery(
    //     api.snippets.getSnippetById,
    //     snippetId ? { snippetId } : "skip"
    // );
    // console.log("Snippet data:", snippet);




    //console.log("snippet data " , snippet)

    // const comments = useQuery(api.snippets.getComments, 
    //     snippetId ? {
    //         snippetId: snippetId as Id<"snippets">
    //     } : "skip"
    // );

    // Show loading state if snippet is undefined or snippetId is missing
    // if (!snippetId || snippet === undefined) {
    //     return <SnippetLoadingSkeleton />;
    // }

    // if (snippet === undefined) {
    //     console.log("Loading state...");
    //     return <SnippetLoadingSkeleton />;
    // }

    // if (snippet === null) {
    //     return <div>Snippet not found</div>;
    // }

    // Show error if no snippetId
    // Loading state
    // if (!snippetId) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
    //             <div className="text-center">
    //                 <h2 className="text-2xl font-semibold text-white mb-2">
    //                     Loading Snippet...
    //                 </h2>
    //             </div>
    //         </div>
    //     );
    // }

    // If we get here, we have data
    //console.log("Rendering snippet:", snippet);


    // Show loading state
    // if (snippet === undefined) {
    //     return <SnippetLoadingSkeleton />;
    // }

    // // Show not found state
    // if (snippet === null) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
    //             <div className="text-center">
    //                 <h2 className="text-2xl font-semibold text-white mb-2">
    //                     Snippet Not Found
    //                 </h2>
    //                 <p className="text-gray-400">
    //                     The requested snippet could not be found.
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }




    /**
     * Fetches the comments related to the snippet using the snippet ID.
     */
    //const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

    /**
     * Displays a loading skeleton while the snippet data is being fetched.
     */
    // if (snippet === undefined) return <SnippetLoadingSkeleton />;

    // return (
    //     <div className="min-h-screen bg-[#0a0a0f]">
    //         <NavigationHeader />

    //         <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
    //             <div className="max-w-[1200px] mx-auto">
    //                 {/* Header */}
    //                 <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
    //                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    //                         <div className="flex items-center gap-4">
    //                             <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
    //                                 <img
    //                                     src={`/${snippet.language}.png`}
    //                                     alt={`${snippet.language} logo`}
    //                                     className="w-full h-full object-contain"
    //                                 />
    //                             </div>
    //                             <div>
    //                                 <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
    //                                     {snippet.title}
    //                                 </h1>
    //                                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
    //                                     <div className="flex items-center gap-2 text-[#8b8b8d]">
    //                                         <User className="w-4 h-4" />
    //                                         <span>{snippet.userName}</span>
    //                                     </div>
    //                                     <div className="flex items-center gap-2 text-[#8b8b8d]">
    //                                         <Clock className="w-4 h-4" />
    //                                         <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
    //                                     </div>
    //                                     <div className="flex items-center gap-2 text-[#8b8b8d]">
    //                                         <MessageSquare className="w-4 h-4" />
    //                                         <span>{comments?.length} comments</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
    //                             {snippet.language}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* Code Editor */}
    //                 <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
    //                     <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
    //                         <div className="flex items-center gap-2 text-[#808086]">
    //                             <Code className="w-4 h-4" />
    //                             <span className="text-sm font-medium">Source Code</span>
    //                         </div>
    //                         <CopyButton code={snippet.code} />
    //                     </div>
    //                     <Editor
    //                         height="600px"
    //                         language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
    //                         value={snippet.code}
    //                         theme="vs-dark"
    //                         beforeMount={defineMonacoThemes}
    //                         options={{
    //                             minimap: { enabled: false },
    //                             fontSize: 16,
    //                             readOnly: true,
    //                             automaticLayout: true,
    //                             scrollBeyondLastLine: false,
    //                             padding: { top: 16 },
    //                             renderWhitespace: "selection",
    //                             fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
    //                             fontLigatures: true,
    //                         }}
    //                     />
    //                 </div>

    //                 <Comments snippetId={snippet._id} />
    //             </div>
    //         </main>
    //         <pre className="text-white p-4">
    //             {JSON.stringify(snippet, null, 2)}
    //         </pre>
    //     </div>
    // );

//     return (
//         <div className="min-h-screen bg-[#0a0a0f] p-4">
//             <h1 className="text-white text-2xl mb-4">{snippet.title}</h1>
//             <pre className="text-white bg-gray-800 p-4 rounded-lg">
//                 {snippet.code}
//             </pre>
//         </div>
//     );
// }
// export default SnippetDetailPage;




"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/Components/NavigationHeader";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root-homepage)/_constant";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";

function SnippetDetailPage() {
    const params = useParams();
    const snippetId = params?.['snippet-detail-page'] as Id<"snippets">;

    const snippet = useQuery(api.snippets.getSnippetById, {
        snippetId: snippetId
    });

    const comments = useQuery(api.snippets.getComments, {
        snippetId: snippetId
    });

    if (snippet === undefined) {
        return <SnippetLoadingSkeleton />;
    }

    if (snippet === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Snippet Not Found
                    </h2>
                    <p className="text-gray-400">
                        The requested snippet could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <NavigationHeader />

            <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header Section */}
                    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                                    <img
                                        src={`/${snippet.language}.png`}
                                        alt={`${snippet.language} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                                        {snippet.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <User className="w-4 h-4" />
                                            <span>{snippet.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{comments?.length || 0} comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
                                {snippet.language}
                            </div>
                        </div>
                    </div>

                    {/* Code Editor Section */}
                    <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
                            <div className="flex items-center gap-2 text-[#808086]">
                                <Code className="w-4 h-4" />
                                <span className="text-sm font-medium">Source Code</span>
                            </div>
                            <CopyButton code={snippet.code} />
                        </div>
                        <Editor
                            height="400px"
                            language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                            value={snippet.code}
                            theme="vs-dark"
                            beforeMount={defineMonacoThemes}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                                readOnly: true,
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 16 },
                                renderWhitespace: "selection",
                                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                            }}
                        />
                    </div>

                    {/* Comments Section */}
                    <Comments snippetId={snippet._id} />
                </div>
            </main>
        </div>
    );
}

export default SnippetDetailPage;