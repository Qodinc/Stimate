import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser, registerUser } from "@/utils/auth";
import jwt from "jsonwebtoken";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: "ID", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);

          return user
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user.id && account.provider != "credentials") {
        const { user: userRegister, token } = await registerUser(user);

        if (!userRegister)
          return false

        user.id = userRegister._id
        user.customer_ids = userRegister.customer_ids
        user.isActiveSubscription = userRegister.isActiveSubscription
      }

      // Permitir el inicio de sesión
      return true;
    },
    async jwt({ token, trigger, user }) {
      if (trigger === "signIn" || trigger === "signUp") {

        if (user) {
          token.id = user.id || token.sub
          token.customer_ids = user.customer_ids
          token.isActiveSubscription = user.isActiveSubscription
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        customer_ids: token.customer_ids,
        isActiveSubscription: token.isActiveSubscription
      };

      if (token.picture) {
        session.user.picture = token.picture;
      }

      session.token = jwt.sign(
        {
          id: token.id,
          email: token.email
        },
        process.env.NEXTAUTH_SECRET,
        {
          expiresIn: '1h'
        }
      );

      return session;
    }
  },
  pages: {
    signIn: '/iniciar-sesion',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 // 1hr = 60 sec. * 60min.
  },
  jwt: {
    maxAge: 60 * 60, // 1hr = 60 sec. * 60min.
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

