import api, { ApiError } from '.'
import { AUTH_URL } from '@/lib/constants'
import { IApiQueries, ISignUpReq, IApiResult, TokenType, IUserProfileRes, ISignInRes, ISignInReq } from './types'

export const signUp = (data: ISignUpReq) => {
  return api
    .post({ url: AUTH_URL.SIGN_UP, body: data })
    .then((res: IApiResult<ISignInRes>) => {
      if (res?.status === "success" && res?.data) {
        return res.data.user
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

export const signIn = (data: ISignInReq) => {
  return api
    .post({ url: AUTH_URL.SIGN_IN, body: data })
    .then((res: IApiResult<ISignInRes>) => {
      if (res?.status === "success" && res?.data) {
        return res.data.user;
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

export const getUserProfile = (token: TokenType) => {
  return api
    .get({ url: AUTH_URL.USER_PROFILE, token })
    .then((res: IApiResult<IUserProfileRes>) => {
      if (res?.status === "success" && res?.data) {
        return res.data.user
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}