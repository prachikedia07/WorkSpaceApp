// // src/app/api/auth/[...nextauth]/authOptions.js
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/app/api/connect/db";
// // NOTE: use default export User model (adjust if your file exports named User)
// import User from "@/app/api/connect/userModel";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });
//         if (!user) throw new Error("User not found");
//         // if password is "oauth" it means they signed up via OAuth — deny credential login
//         if (!user.password || user.password === "oauth") throw new Error("Use OAuth provider or reset password.");
//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid password");
//         // update lastLogin
//         user.lastLogin = new Date();
//         await user.save();
//         // return fields NextAuth expects on initial sign-in
//         return { id: user._id.toString(), name: user.name, email: user.email };
//       }
//     }),
//   ],

//   callbacks: {
//     /**
//      * session callback runs whenever session is checked.
//      * We fetch fresh user data from DB so session contains latest avatar/name/firstName/lastName.
//      */
//     async session({ session, token }) {
//       try {
//         // ensure basic fields exist
//         session.user = session.user || {};

//         // prefer token.sub or token.id for id
//         if (token?.sub) session.user.id = token.sub;
//         if (!session.user.email && token?.email) session.user.email = token.email;

//         // If we have an email, fetch from DB to get canonical fields (avatar/name/etc)
//         const email = session?.user?.email || token?.email;
//         if (email) {
//           await connectDB();
//           const dbUser = await User.findOne({ email }).lean();
//           if (dbUser) {
//             session.user.id = String(dbUser._id);
//             session.user._id = String(dbUser._id);
//             session.user.email = dbUser.email || session.user.email;
//             session.user.name = dbUser.name || `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim() || session.user.name;
//             session.user.firstName = dbUser.firstName || "";
//             session.user.lastName = dbUser.lastName || "";
//             session.user.avatar = dbUser.avatar || "";
//             // also mirror any other profile fields you want available client-side
//             session.user.role = dbUser.role || session.user.role;
//           }
//         }
//       } catch (e) {
//         console.error("session callback error:", e);
//       }
//       return session;
//     },

//     /**
//      * jwt callback — persist  useful fields into token so they survive across requests
//      */
//     async jwt({ token, user }) {
//       // On sign-in, `user` will be set (credentials provider returns user object)
//       if (user) {
//         token.sub = token.sub || user.id || user?.id;
//         token.email = user.email || token.email;
//         token.name = user.name || token.name;
//       }

//       // If token has an email, try to include latest avatar/name from DB (best-effort)
//       try {
//         if (token?.email) {
//           await connectDB();
//           const dbUser = await User.findOne({ email: token.email }).lean();
//           if (dbUser) {
//             token.name = dbUser.name || token.name;
//             token.avatar = dbUser.avatar || token.avatar;
//             token.firstName = dbUser.firstName || token.firstName;
//             token.lastName = dbUser.lastName || token.lastName;
//           }
//         }
//       } catch (e) {
//         // don't block auth on DB read issues — just continue with token as-is
//         // console.warn("jwt callback db read failed:", e);
//       }

//       return token;
//     },
//   },

//   pages: { signIn: "/login" },
//   secret: process.env.NEXTAUTH_SECRET,
// };
// src/app/api/auth/[...nextauth]/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/api/connect/db";
import User from "@/app/api/connect/userModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { 
        email: { label: "Email", type: "email" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        if (!user.password || user.password === "oauth") {
          throw new Error("Use OAuth provider or reset password.");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        
        user.lastLogin = new Date();
        await user.save();
        
        // Return minimal data - NextAuth will call jwt callback next
        return { 
          id: user._id.toString(), 
          email: user.email,
          name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim()
        };
      }
    }),
  ],

  callbacks: {
    /**
     * JWT callback - Store only essential data in token
     * This runs on sign-in and whenever token is accessed
     */
    // async jwt({ token, user, trigger, session }) {
    //   // On initial sign-in, user object is available
    //   if (user) {
    //     token.sub = user.id;
    //     token.email = user.email;
    //   }

    //   // When session is manually updated (e.g., after profile change)
    //   if (trigger === "update") {
    //     try {
    //       await connectDB();
    //       const dbUser = await User.findOne({ email: token.email }).lean();
    //       if (dbUser) {
    //         token.name = dbUser.name || `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim();
    //         token.avatar = dbUser.avatar || "";
    //       }
    //     } catch (e) {
    //       console.error("jwt update error:", e);
    //     }
    //   }

    //   return token;
    // },
async jwt({ token, user, trigger }) {
  // On initial sign-in, `user` exists (from provider or credentials)
  // Upsert the user in DB and set token.sub to DB _id so it's consistent.
  if (user) {
    try {
      await connectDB();
      const email = (user.email || "").toLowerCase();
      // upsert ensures OAuth users get a DB record and same _id across logins
      const dbUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            name: user.name || user?.email?.split('@')[0],
            email,
            image: user.image || user.avatar || ""
          },
          // store provider if available
          $setOnInsert: { provider: user.provider || "credentials" }
        },
        { upsert: true, new: true }
      );

      if (dbUser) {
        token.sub = dbUser._id.toString();
        token.email = dbUser.email;
        token.name = dbUser.name || "";
        token.avatar = dbUser.avatar || dbUser.image || "";
      } else {
        // fallback to provider values if DB upsert unexpectedly fails
        token.sub = user.id || token.sub;
        token.email = user.email || token.email;
        token.name = user.name || token.name;
      }
    } catch (e) {
      console.error("jwt db upsert error:", e);
      // leave token as-is if DB fails
      token.sub = token.sub || user.id;
      token.email = token.email || user.email;
    }
  }

  // When session is manually updated (e.g., after profile change)
  if (trigger === "update") {
    try {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email }).lean();
      if (dbUser) {
        token.name = dbUser.name || `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim();
        token.avatar = dbUser.avatar || dbUser.image || "";
      }
    } catch (e) {
      console.error("jwt update error:", e);
    }
  }

  return token;
},

    /**
     * Session callback - Build session from token
     * Keep this MINIMAL - don't fetch from DB here!
     */
    // async session({ session, token }) {
    //   if (session.user) {
    //     session.user.id = token.sub;
    //     session.user.email = token.email;
    //     session.user.name = token.name;
    //     session.user.avatar = token.avatar || "";
    //   }
    //   return session;
    // },
    async session({ session, token }) {
  if (session.user) {
    session.user.id = token.sub || session.user.id || null;
    session.user.email = token.email || session.user.email;
    session.user.name = token.name || session.user.name;
    session.user.avatar = token.avatar || session.user.avatar || "";
  }
  return session;
},

  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  
  // Add session strategy to use JWT (not database sessions)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};