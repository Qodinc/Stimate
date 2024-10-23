import NextAuth from "next-auth";
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

export default NextAuth(authOptions);

