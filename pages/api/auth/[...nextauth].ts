import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import UserSchema from "lib/models/user";
import dbConnect from "lib/dbConnect";

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /api/auth/signout:
 *   post:
 *     summary: Log out
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               csrfToken:
 *                 type: string
 *                 description: CSRF token
 *     responses:
 *       302:
 *         description: User logged out
 * /api/auth/csrf:
 *   get:
 *     summary: Get CSRF token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: CSRF token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 *                   description: CSRF token
 * /api/auth/callback/credentials:
 *   post:
 *     summary: Log in with credentials
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               csrfToken:
 *                 type: string
 *                 description: CSRF token
 *               email:
 *                 type: string
 *                 description: Email
 *               password:
 *                 type: string
 *                 description: Password
 *                 format: password
 *               callbackUrl:
 *                 type: string
 *                 description: Callback URL
 *               redirect:
 *                 type: boolean
 *                 description: Redirect
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: callbackUrl
 * /api/auth/session:
 *   get:
 *     summary: Get session
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Email
 *                     name:
 *                       type: string
 *                       description: Name
 *                     surname:
 *                       type: string
 *                       description: Surname
 *                     id:
 *                       type: string
 *                       description: UID
 *                       format: uuid
 *                     isGestore:
 *                       type: boolean
 *                       description: Is gestore
 *                 expires:
 *                   type: string
 *                   description: Expires
 */
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
      session.user.id = token.id;
      session.user.surname = token.surname;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isGestore = user.isGestore;
        token.surname = user.surname;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
