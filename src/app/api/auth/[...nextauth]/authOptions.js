// src/app/api/auth/[...nextauth]/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/api/connect/db";
// NOTE: use default export User model (adjust if your file exports named User)
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
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        // if password is "oauth" it means they signed up via OAuth — deny credential login
        if (!user.password || user.password === "oauth") throw new Error("Use OAuth provider or reset password.");
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        // update lastLogin
        user.lastLogin = new Date();
        await user.save();
        // return fields NextAuth expects on initial sign-in
        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    }),
  ],

  callbacks: {
    /**
     * session callback runs whenever session is checked.
     * We fetch fresh user data from DB so session contains latest avatar/name/firstName/lastName.
     */
    async session({ session, token }) {
      try {
        // ensure basic fields exist
        session.user = session.user || {};

        // prefer token.sub or token.id for id
        if (token?.sub) session.user.id = token.sub;
        if (!session.user.email && token?.email) session.user.email = token.email;

        // If we have an email, fetch from DB to get canonical fields (avatar/name/etc)
        const email = session?.user?.email || token?.email;
        if (email) {
          await connectDB();
          const dbUser = await User.findOne({ email }).lean();
          if (dbUser) {
            session.user.id = String(dbUser._id);
            session.user._id = String(dbUser._id);
            session.user.email = dbUser.email || session.user.email;
            session.user.name = dbUser.name || `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim() || session.user.name;
            session.user.firstName = dbUser.firstName || "";
            session.user.lastName = dbUser.lastName || "";
            session.user.avatar = dbUser.avatar || "";
            // also mirror any other profile fields you want available client-side
            session.user.role = dbUser.role || session.user.role;
          }
        }
      } catch (e) {
        console.error("session callback error:", e);
      }
      return session;
    },

    /**
     * jwt callback — persist useful fields into token so they survive across requests
     */
    async jwt({ token, user }) {
      // On sign-in, `user` will be set (credentials provider returns user object)
      if (user) {
        token.sub = token.sub || user.id || user?.id;
        token.email = user.email || token.email;
        token.name = user.name || token.name;
      }

      // If token has an email, try to include latest avatar/name from DB (best-effort)
      try {
        if (token?.email) {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email }).lean();
          if (dbUser) {
            token.name = dbUser.name || token.name;
            token.avatar = dbUser.avatar || token.avatar;
            token.firstName = dbUser.firstName || token.firstName;
            token.lastName = dbUser.lastName || token.lastName;
          }
        }
      } catch (e) {
        // don't block auth on DB read issues — just continue with token as-is
        // console.warn("jwt callback db read failed:", e);
      }

      return token;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
