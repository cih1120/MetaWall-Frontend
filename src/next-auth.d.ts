import NextAuth from "next-auth"
import { IUserProfile } from "./types";

interface IError {
  error: { statusCode: number }
}
export type NextAuthUserType = IUserProfile & { token: string } | IError

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUserProfile & { token: string };
  }
  interface User extends NextAuthUserType { token?: string }
}