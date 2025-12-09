import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "@/lib/prisma"

const providers = []

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

// Only add Email provider if configured
if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    })
  )
}

// Only use Prisma adapter if database is available
let adapter = undefined;
try {
  adapter = PrismaAdapter(prisma);
} catch (error) {
  console.warn('Prisma adapter not available, using JWT sessions');
}

// Ensure we always have a secret for NextAuth
const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_URL || "development-secret-key-change-in-production-please-change";

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  adapter: adapter,
  providers: providers.length > 0 ? providers : [
    // Fallback: Minimal Email provider for development
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "localhost",
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      },
      from: process.env.EMAIL_FROM || "noreply@localhost",
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        // Try to get user data from database if available
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email! },
            select: { id: true, role: true, plan: true, zip: true, zone: true }
          })
          
          if (dbUser) {
            session.user.id = dbUser.id
            session.user.role = dbUser.role
            session.user.plan = dbUser.plan
            session.user.zip = dbUser.zip
            session.user.zone = dbUser.zone
          } else if (token && !adapter) {
            // For JWT strategy, use token data
            session.user.id = token.sub
          }
        } catch (error) {
          // Database not available, use token data for JWT
          if (token && !adapter) {
            session.user.id = token.sub
          }
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Only try database operations if adapter is available
      if (adapter && account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
          
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: "FREE",
                plan: "FREE",
                zip: "21701", // Default to Frederick, MD
                zone: "6b"
              }
            })
          }
        } catch (error) {
          console.warn('Database operation failed during signIn:', error);
        }
      }
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  session: {
    strategy: adapter ? "database" : "jwt",
  },
  // Only enable debug if explicitly set
  debug: process.env.NEXTAUTH_DEBUG === "true",
}

