// Set NEXTAUTH_SECRET before any NextAuth imports to prevent NO_SECRET error
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "growcommon-development-secret-key-minimum-32-characters-long-for-nextauth";
}
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }




