import { compare } from "bcrypt";
import dbConnect from "lib/dbConnect";
import UserSchema from "lib/models/user";
import NextAuth, {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: null,
        password: null,
      },
      async authorize(credentials) {
        const error = "Invalid email or password";
        await dbConnect();
        // check user existance
        const result = await UserSchema.findOne({ email: credentials.email });
        if (!result) {
          throw new Error(error);
        }
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error(error);
        }

        return result;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.isGestore = token.isGestore;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isGestore = user.isGestore;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
