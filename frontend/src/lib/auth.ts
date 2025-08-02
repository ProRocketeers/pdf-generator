import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          hd: process.env.GOOGLE_WORKSPACE_DOMAIN, // prorocketeers.com
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email
        const allowedDomain = process.env.GOOGLE_WORKSPACE_DOMAIN
        
        if (email && allowedDomain && email.endsWith(`@${allowedDomain}`)) {
          return true
        }
        return false
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      // Při prvním přihlášení uložíme údaje do tokenu
      if (user) {
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      // Předáme údaje ze session
      if (token) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
}
