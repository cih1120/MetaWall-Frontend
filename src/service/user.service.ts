import api, { ApiError } from '.'
import { USER_URL } from "@/lib/constants"
import { IApiResult, TokenType } from "./types"

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