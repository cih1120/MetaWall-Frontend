import api, { ApiError } from '.'
import { IPost, IUser } from '@/types'
import { POSTS_URL } from '@/lib/constants'
import { IApiResult, IPostReq, INewPostReq, TokenType, IUploadRes, ICommentReq } from './types'

/* 取得所有貼文 */
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

/* 取得特定貼文 */
export const getPostById = (token: TokenType, id: IPost["_id"]) => {
    return api
        .get({ token, url: `${POSTS_URL.POSTS}/${id}` })
        .then((res: IApiResult<IPost>) => {
            if (res?.status === 'success' && res?.data) {
                return res.data
            } else {
                return {
                    user: "",
                    _id: "",
                    title: "",
                    content: "",
                    createdAt: "",
                    likes: [],
                    photo: "",
                    comments: [],
                }
            }
        })
}

/* 取得特定用戶貼文 */
export const getPostByUser = (token: TokenType, id: IUser["_id"], queries?: IPostReq) => {
    return api
        .get({ token, url: POSTS_URL.USER_POSTS(id), queries })
        .then((res: IApiResult<IPost[]>) => {
            if (res?.status === 'success' && res?.data) {
                return res.data
            } else {
                return []
            }
        })
}

/* 新增貼文 */
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

/* 新增留言 */
export const addComment = (data: ICommentReq, token: TokenType) => {
    return api
        .post({ url: POSTS_URL.COMMENT(data.id), body: data, token })
        .then((res: IApiResult<IPost>) => {
            if (res?.status === 'success' && res.data) {
                return res.data
            } else {
                throw new ApiError('Unexpected response format', 500);
            }
        })
}

/* 移除留言 */
export const deleteComment = (id: ICommentReq["id"], token: TokenType) => {
    return api
        .delete({ url: POSTS_URL.COMMENT(id), token })
        .then((res: IApiResult<IPost>) => {
            if (res?.status === 'success' && res.data) {
                return res.data
            } else {
                throw new ApiError('Unexpected response format', 500);
            }
        })
}

/* 上傳圖片 */
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
