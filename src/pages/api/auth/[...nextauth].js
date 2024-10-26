import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/utils/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          
          // Formateamos el usuario para que coincida con la estructura
          // que estamos usando para Google
          return {
            id: user._id, // o el campo que uses como id en MongoDB
            name: user.name,
            email: user.email,
            // No incluimos la contraseña por seguridad
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
        // Para Google OAuth
        if (account.provider === "google") {
          token.accessToken = account.access_token;
          token.idToken = account.id_token;
        }
        // Para ambos casos (Google y Credentials)
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Asegurarse de que estamos asignando correctamente los datos del usuario
      session.user = {
        id: token.user.id,
        name: token.user.name,
        email: token.user.email,
      };
      
      // Solo agregamos estos campos si existen (caso de Google)
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.picture) {
        session.user.picture = token.picture;
      }
      
      return session;
    },
  },
  pages: {
    signIn: '/iniciar-sesion', // Si tienes una página personalizada de login
    error: '/auth/error', // Página de error opcional
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);


/* import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.user = {
          name: profile.name,
          email: profile.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Asegurarse de que estamos asignando correctamente los datos del usuario
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.email = token.user?.email;  // Usamos token.user.email en lugar de token.email
      session.user.name = token.user?.name;    // Usamos token.user.name en lugar de token.name
      session.user.picture = token.picture;    // Usamos token.user.name en lugar de token.name 
      
      return session; // Retornamos explícitamente la sesión
    },
  },
};

export default NextAuth(authOptions); */

