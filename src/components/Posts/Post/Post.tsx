import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@nextui-org/react'
import { IComment, IPost } from '@/types'
import PostHeader from './PostHeader'
import PostComment from './PostComment'
import PostLikes from './PostLikes'
import PostCommentInput from './PostCommentInput'

export default function Post({ data }: { data?: IPost }) {
    const [comments, setComments] = useState<IComment[]>([])
    const updatePostInfo = (updatePost: IPost) => {
        if (updatePost.comments) {
            setComments(updatePost.comments)
        }
    }
    useEffect(() => {
        if (data?.comments) {
            setComments(data.comments)
        }
    }, [])
    return (
        <li className="card block">
            {data ? (
                <>
                    <div className="flex flex-col gap-4 py-2 md:py-4">
                        <PostHeader
                            user={data.user}
                            createdAt={data.createdAt}
                        />
                        <div>
                            <p className=" font-semibold">{data.title}</p>
                            <p>{data.content}</p>
                        </div>
                        {data.photo && <PostPhoto src={data.photo} />}
                    </div>
                    <PostLikes postId={data._id} likes={data.likes} />
                    <PostCommentInput
                        updatePostInfo={updatePostInfo}
                        postId={data._id}
                    />
                    <CommentList
                        updatePostInfo={updatePostInfo}
                        comments={comments}
                    />
                </>
            ) : (
                <div className="flex flex-col gap-4 py-2 md:py-4">
                    <div className="flex gap-2">
                        <Skeleton className="flex h-10 w-10 rounded-full" />
                        <div className="flex w-4/12 flex-col gap-2">
                            <Skeleton className="flex h-2 w-full rounded-full" />
                            <Skeleton className="flex h-2 w-full rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="flex h-6 w-full rounded-full" />
                    <Skeleton className="flex h-6 w-full rounded-full" />
                    <Skeleton className="flex h-6 w-full rounded-full" />
                </div>
            )}
        </li>
    )
}

const CommentList = ({
    comments,
    updatePostInfo,
}: {
    comments: IComment[] | undefined
    updatePostInfo: (updatePost: IPost) => void
}) => {
    return (
        <ul className="mt-2 flex w-full flex-col gap-4">
            {comments &&
                comments?.length > 0 &&
                [...comments]
                    .reverse()
                    .map((comment) => (
                        <PostComment
                            key={comment._id}
                            updatePostInfo={updatePostInfo}
                            comment={comment}
                        />
                    ))}
        </ul>
    )
}

const PostPhoto = ({ src }: { src: IPost['photo'] }) => {
    return (
        <Image
            src={src!}
            width={500}
            height={500}
            alt=""
            className="mb-4 max-h-[300px] w-full rounded-lg border-2 border-gray-dark object-cover"
        />
    )
}
