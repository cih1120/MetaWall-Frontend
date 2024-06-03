import api, { ApiError } from '.'
import { USER_URL } from "@/lib/constants"
import { IApiResult, TokenType, IUserProfileRes } from "./types"

/* 取得其他用戶資料 */
export const getUserProfileById = (userId: string, token: TokenType) => {
  return api
    .get({ url: USER_URL.OTHER_USER_PROFILE(userId), token, tags: ["user"] })
    .then((res: IApiResult<IUserProfileRes>) => {
      if (res?.status === "success" && res?.data) {
        return res.data.user
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 新增一則貼文的讚 */
export const postLike = (postId: string, token: TokenType) => {
  return api
    .post({ url: USER_URL.POST_LIKE(postId), token })
    .then((res: IApiResult) => {
      if (res?.status === "success") {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 取消一則貼文的讚 */
export const postUnLike = (postId: string, token: TokenType) => {
  return api
    .delete({ url: USER_URL.POST_UNLIKE(postId), token })
    .then((res: IApiResult) => {
      if (res?.status === "success") {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 追蹤用戶 */
export const followUser = (userId: string, token: TokenType) => {
  return api
    .post({ url: USER_URL.FOLLOW_USER(userId), token })
    .then((res: IApiResult) => {
      if (res?.status === "success") {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}

/* 追蹤用戶 */
export const unFollowUser = (userId: string, token: TokenType) => {
  return api
    .delete({ url: USER_URL.UN_FOLLOW_USER(userId), token })
    .then((res: IApiResult) => {
      if (res?.status === "success") {
        return res
      } else {
        throw new ApiError('Unexpected response format', 500);
      }
    })
}