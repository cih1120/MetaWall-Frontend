import NextAuth from "next-auth"
import { IUserProfile } from "./types";
import { ISignInRes } from "./service/types";

interface IError {
  error: { statusCode: number }
}
export type NextAuthUserType = ISignInRes | IError

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUserProfile;
    token: string
  }

  interface User extends NextAuthUserType { }
  interface DefaultUser extends User { }
  interface AdapterUser extends User { }
}