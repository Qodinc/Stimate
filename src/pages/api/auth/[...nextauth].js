import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser, registerUser } from "@/utils/auth";

export const authOptions = {
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
          const {user, token} = await loginUser(credentials);

          const auth = {
            id: user._id,
            name: user.name,
            email: user.email,
            customer_ids: user.customer_ids,
            accessToken: token
          };
          
          return auth
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.id && account.provider != "credentials") {
        const {user: userRegister, token} = await registerUser(user);

        if (!userRegister)
          return false

        else {
          user.id = userRegister._id
          user.customer_ids = userRegister.customer_ids
          
          // generar token
          user.accessToken = token
        }
      }

      // Permitir el inicio de sesión
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        if (user) {
          token.id = user.id || token.sub
          token.customer_ids = user.customer_ids
          token.accessToken = user.accessToken
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        customer_ids: token.customer_ids
      };
      
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.picture) {
        session.user.picture = token.picture;
      }
      
      return session;
    }
  },
  pages: {
    signIn: '/iniciar-sesion',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

