import { IPost } from '@/types'
import { POSTS_URL } from '@/lib/constants'
import api, { ApiError } from '.'
import { IApiResult, IPostReq, INewPostReq, TokenType, IUploadRes } from './types'

export const getPosts = (token: TokenType, queries?: IPostReq) => {
    return api
        .get({ token, url: POSTS_URL.POSTS, queries, tags: ["post"] })
        .then((res: IApiResult<IPost[]>) => {
            if (res?.status === 'success' && res?.data) {
                return res.data
            } else {
                return []
            }
        })
}

export const addPost = (data: INewPostReq, token: TokenType) => {
    return api
        .post({ url: POSTS_URL.POSTS, body: data, token })
        .then((res: IApiResult<IPost[]>) => {
            if (res?.status === 'success') {
                return res
            } else {
                throw new ApiError('Unexpected response format', 500);
            }
        })
}

export const uploadPhoto = (formData: FormData, token: TokenType) => {
    return api
        .post({ url: POSTS_URL.UPLOAD_PHOTO, body: formData, token })
        .then((res: IApiResult<IUploadRes>) => {
            if (res?.status === 'success' && res.data?.fileUrl) {
                return res.data.fileUrl
            } else {
                throw new ApiError('Unexpected response format', 500);
            }
        })
}
