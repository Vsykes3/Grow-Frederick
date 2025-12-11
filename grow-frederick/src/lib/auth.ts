import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
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

// Only add Email provider if fully configured
if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT || "587",
        auth: process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD ? {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        } : undefined,
      },
      from: process.env.EMAIL_FROM,
    })
  )
}

// Only add Credentials provider if no other providers are configured
// This ensures NextAuth always has at least one valid provider
if (providers.length === 0) {
  providers.push(
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For development: allow any email/password combination
        // In production, replace this with actual authentication logic
        if (credentials?.email) {
          return {
            id: credentials.email,
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        }
        return null
      }
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

// Ensure we always have a secret for NextAuth - must be at least 32 characters
// Generate a consistent fallback secret for development
const nextAuthSecret = process.env.NEXTAUTH_SECRET || "growcommon-development-secret-key-minimum-32-characters-long-for-nextauth";

// Don't use adapter with Credentials provider (requires JWT)
const useAdapter = adapter && !providers.some((p: any) => p.id === "credentials");

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  adapter: useAdapter ? adapter : undefined,
  providers: providers,
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
          } else if (token && !useAdapter) {
            // For JWT strategy, use token data
            session.user.id = token.sub
          }
        } catch (error) {
          // Database not available, use token data for JWT
          if (token && !useAdapter) {
            session.user.id = token.sub
          }
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Only try database operations if adapter is available
      if (useAdapter && account?.provider === "google") {
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
    // Credentials provider requires JWT strategy
    strategy: useAdapter ? "database" : "jwt",
  },
  // Only enable debug if explicitly set
  debug: process.env.NEXTAUTH_DEBUG === "true",
}

