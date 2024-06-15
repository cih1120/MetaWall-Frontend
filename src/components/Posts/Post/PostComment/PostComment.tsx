import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { IPost, IComment } from '@/types'
import { useUserStore } from '@/store/user/userStore'
import { deleteComment } from '@/service/posts.service'
import { useSessionUser } from '@/lib/utils'
import PostHeader from '../PostHeader'

export default function PostComment({
    comment,
    updatePostInfo,
}: {
    comment: IComment
    updatePostInfo: (updatePost: IPost) => void
}) {
    const { id: currentUserId } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSessionUser()

    const isPostAuthor = useMemo(() => {
        return currentUserId === comment.user['id']
    }, [comment, currentUserId])

    const handleDelete = async () => {
        setIsLoading(true)
        const postResponse = await deleteComment(comment.id, user!.token)
        updatePostInfo(postResponse)
        toast.success('刪除成功！')
        setIsLoading(false)
    }
    return (
        <li className="block w-full rounded-xl bg-gray-light px-4 py-5">
            <div className="relative">
                <PostHeader user={comment.user} createdAt={comment.createdAt} />
                <p className="mt-1.5 pl-14">{comment.comment}</p>
                {isPostAuthor && (
                    <button
                        disabled={isLoading}
                        onClick={handleDelete}
                        className="absolute right-0 top-0"
                    >
                        <XMarkIcon className="size-5 text-gray-dark/30" />
                    </button>
                )}
            </div>
        </li>
    )
}
