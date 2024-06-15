import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import Avatar from '@/components/Avatar'
import { IPost } from '@/types'
import { useUserStore } from '@/store/user/userStore'
import { addComment } from '@/service/posts.service'
import { ICommentReq } from '@/service/types'
import { useSessionUser } from '@/lib/utils'

export default function PostCommentInput({
    postId,
    updatePostInfo,
}: {
    postId: IPost['id']
    updatePostInfo: (updatePost: IPost) => void
}) {
    const { avatar, name } = useUserStore()
    const user = useSessionUser()
    const [comment, setComment] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (comment.trim() === '') {
            return
        }
        setIsLoading(true)
        const data: ICommentReq = {
            comment,
            id: postId,
        }
        const postResponse = await addComment(data, user!.token)
        updatePostInfo(postResponse)
        setIsLoading(false)
        setComment('')
    }

    return (
        <div className="mt-3 flex items-center gap-2">
            <Avatar
                className="hidden md:block"
                isBordered={false}
                src={avatar}
                name={name}
            />
            <div className="flex h-fit w-full border-2 border-gray-dark">
                <Input
                    type="text"
                    placeholder="留言..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    classNames={{
                        inputWrapper: 'rounded-none',
                    }}
                />
                <Button
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    className="rounded-none border-l-2 border-gray-dark bg-primary text-white"
                >
                    留言
                </Button>
            </div>
        </div>
    )
}
