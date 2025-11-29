import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "../../connect/db";
import { User } from "../../connect/userModel";

// 🔹 Auth configuration
const authOptions = {
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        if (account.provider === "google" || account.provider === "github") {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name || profile?.name || "Unnamed User",
              email: user.email,
              password: "oauth",
              provider: account.provider,
              image: user.image || profile?.picture || "",
              lastLogin: new Date(),
            });
          } else {
            const update = { lastLogin: new Date() };
            if (!existingUser.provider) update.provider = account.provider;
            if (user.image || profile?.picture)
              update.image = user.image || profile?.picture;
            await User.findByIdAndUpdate(existingUser._id, update, { new: true });
          }
        }
        return true;
      } catch (err) {
        console.error("signIn callback error:", err);
        return false;
      }
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Proper App Router export — NO default export!
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
