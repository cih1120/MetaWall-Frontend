import { useEffect, useMemo, useState } from 'react'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as HandThumbUpSolidIcon } from '@heroicons/react/24/solid'
import { IPost } from '@/types'
import { postLike, postUnLike } from '@/service/user.service'
import { useSessionUser } from '@/lib/utils'
import { useUserStore } from '@/store/user/userStore'

export default function PostLikes({
    likes,
    postId,
}: {
    likes: IPost['likes']
    postId: IPost['id']
}) {
    const user = useSessionUser()
    const { id: userId } = useUserStore()
    const [postLikes, setPostLikes] = useState(0)
    const [hasUserWithId, setHasUserWithId] = useState(false)
    const [isShaking, setIsShaking] = useState(false)

    useEffect(() => {
        setPostLikes(likes.length)
        setHasUserWithId(() => likes.some((like) => like.user === userId))
    }, [likes, userId])

    const handleButtonClick = async (event: React.MouseEvent) => {
        if (hasUserWithId) {
            await handlePostUnLike()
        } else {
            await handlePostLike()
        }
    }

    const handlePostLike = async () => {
        setPostLikes((pre) => (pre += 1))
        setHasUserWithId(true)
        setIsShaking(true)
        await postLike(postId, user!.token)
    }

    const handlePostUnLike = async () => {
        setPostLikes((pre) => (pre -= 1))
        setHasUserWithId(false)
        setIsShaking(true)
        await postUnLike(postId, user!.token)
    }

    const Icon = useMemo(() => {
        return hasUserWithId ? (
            <HandThumbUpSolidIcon
                className={`size-6 text-primary ${isShaking ? 'animate-tada' : ''}`}
            />
        ) : (
            <HandThumbUpIcon className={`size-6 text-gray`} />
        )
    }, [hasUserWithId, isShaking])
    return (
        <div className="flex cursor-pointer gap-2 text-sm">
            <button
                onClick={handleButtonClick}
                className="flex items-center gap-1 "
            >
                {Icon}
                {postLikes === 0 ? (
                    <span>成為第一個按讚的朋友</span>
                ) : (
                    <span>{postLikes}</span>
                )}
            </button>
        </div>
    )
}
