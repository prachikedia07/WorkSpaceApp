import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/api/connect/db";
import { User } from "@/app/api/connect/userModel";

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
        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    }),
  ],
  callbacks: {
  // async session({ session, user }) {
  //   // ensure session.user.id is set (Credentials provider returns id already)
  //   session.user = session.user || {};
  //   // prefer user.id (from adapter / authorize), fallback to existing, fallback to null
  //   session.user.id = user?.id || user?._id?.toString?.() || session.user.id || null;
  //   return session;
  // },
  async session({ session, token }) {
    if (session?.user) {
      // ✅ Make sure user.id is set from token
      session.user.id = token.sub;
      
      // ✅ Also fetch the actual MongoDB _id
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email }).lean();
        if (dbUser) {
          session.user.id = String(dbUser._id);
          session.user._id = String(dbUser._id);
        }
      } catch (err) {
        console.error("Session callback error:", err);
      }
    }
    return session;
  },
  async jwt({ token, user }) {
    // when using credentials provider, user may be returned at sign in, copy id to token
    if (user?.id) token.id = user.id;
    return token;
  }
},

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
