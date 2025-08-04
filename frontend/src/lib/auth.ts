import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  debug: true, // Pro detailní logy
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          hd: process.env.GOOGLE_WORKSPACE_DOMAIN,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { user, account, profile })

      if (account?.provider === "google") {
        const email = user.email
        const allowedDomain = process.env.GOOGLE_WORKSPACE_DOMAIN

        console.log('Domain validation:', {
          email,
          allowedDomain,
          isValid: email && allowedDomain && email.endsWith(`@${allowedDomain}`)
        })

        if (email && allowedDomain && email.endsWith(`@${allowedDomain}`)) {
          return true
        }
        console.log('❌ Domain validation failed')
        return false
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image as string
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
