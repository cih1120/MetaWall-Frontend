import { IPost } from '@/types'
import { POSTS_URL } from '@/lib/constants'
import api from '.'
import { IApiResult, IPostReq } from './types'

export const getPosts = (queries?: IPostReq) => {
    return api
        .get({ url: POSTS_URL.POSTS, queries })
        .then((res: IApiResult<IPost[]>) => {
            if (res?.status === 'success' && res?.data) {
                return res.data
            } else {
                return []
            }
        })
}
