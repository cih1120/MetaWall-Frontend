import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/service/auth.service";
import { NextAuthUserType } from "@/next-auth"
import authOptions from "./authOptions";


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }