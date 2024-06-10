import api, { ApiError } from '.'
import { AUTH_URL } from '@/lib/constants'
import { IUploadRes, ISignUpReq, IApiResult, IUpdatePasswordReq, TokenType, IUserProfileRes, ISignInRes, ISignInReq, IUserProfileReq } from './types'

/* 註冊 */
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

/* 登入 */
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

/* 取得當前用戶資料 */
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

/* 上傳用戶大頭貼 */
export const uploadAvatar = (formData: FormData, token: TokenType) => {
  return api
    .post({ url: AUTH_URL.UPLOAD_AVATAR, body: formData, token })
    .then((res: IApiResult<IUploadRes>) => {
      if (res?.status === 'success' && res.data?.fileUrl) {
        return res.data.fileUrl
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 修改當前用戶資料 */
export const editUserProfile = (newUserProfile: IUserProfileReq, token: TokenType) => {
  return api
    .patch({ url: AUTH_URL.PROFILE_PATCH, body: newUserProfile, token })
    .then((res: IApiResult) => {
      if (res?.status === 'success') {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 修改密碼 */
export const updatePassword = (data: IUpdatePasswordReq, token: TokenType) => {
  return api
    .post({ url: AUTH_URL.UPDATE_PASSWORD, body: data, token })
    .then((res: IApiResult<IUpdatePasswordReq>) => {
      if (res?.status === 'success') {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}