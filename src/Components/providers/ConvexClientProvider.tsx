// "use client";
// import { ClerkProvider, useAuth } from "@clerk/clerk-react";
// import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
// function ConvexClientProvider({ children }: { children: React.ReactNode }) {

//   return (
//     <div>
//       <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} >

//         <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//           {children}

//         </ConvexProviderWithClerk>
//       </ClerkProvider>

//     </div>
//   )
// }

// export default ConvexClientProvider

"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/clerk-react";  // Keep useAuth here

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth} >
      {children}
    </ConvexProviderWithClerk>
  );
}

export default ConvexClientProvider;