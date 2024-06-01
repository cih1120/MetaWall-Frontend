import { TIME_SORT, Gender, IUserProfile } from '@/types'
/* Basic Api基本結構 */
export type IApiQueries = {
  [key: string]: string | number | undefined
}

export type TokenType = string;

export interface IApiGet {
  baseUrl?: string, url: string, queries?: IApiQueries, token?: TokenType, tags?: string[]
}

export interface IApiPost extends IApiGet {
  body?: IApiQueries | FormData
}

export interface IApiResult<T = undefined> {
  status: string,
  data?: T,
  message?: string,
  statusCode?: number,
}

export interface IUploadRes {
  fileUrl: string
}


/* Post 動態貼文 */
export interface IPostReq extends IApiQueries {
  timeSort: TIME_SORT,
  q?: string
}

export interface INewPostReq extends IApiQueries {
  title: string,
  content: string,
  photo?: string,
}

export interface ICommentReq extends IApiQueries {
  id: string,
  comment: string,
}

/* Auth 會員功能 */
export interface ISignUpReq extends IApiQueries {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
  gender: Gender
}

export interface ISignInReq extends IApiQueries {
  email: string
  password: string
}

export interface ISignInRes {
  user: {
    token: TokenType,
  } & IUserProfile
}

export interface IUserProfileRes {
  user: IUserProfile
}