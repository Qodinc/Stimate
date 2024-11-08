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
          const user = await loginUser(credentials);
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        if (account.provider === "google") {
          token.accessToken = account.access_token;
          token.idToken = account.id_token;
        }
        if (user) {
          token.id = user.id || user.sub
          token.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            customer_ids: user.customer_ids
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.picture) {
        session.user.picture = token.picture;
      }
      
      return session;
    },
    async signIn({ user, account, profile }) {
      // Conecta a la base de datos mediante fetch al backend. Mandar mis datos para registar un usuario
      user.provider = account.provider
      if (user.id) {
        const userRegister = await registerUser(user);

        if (!userRegister) 
          return false
      }
      else {
        return true
      }

      user.id = userRegister._id
      user.customer_ids = userRegister.customer_ids
      // Permitir el inicio de sesión
      return true;
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

