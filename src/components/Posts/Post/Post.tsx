import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@nextui-org/react'
import { IComment, IPost } from '@/types'
import PostHeader from './PostHeader'
import PostComment from './PostComment'
import PostLikes from './PostLikes'
import PostCommentInput from './PostCommentInput'

export default function Post({ data }: { data?: IPost }) {
    return (
        <li className="block rounded-lg border-2 border-gray-dark bg-white p-6 shadow-[0_2px_0_#000400]">
            {data ? (
                <>
                    <div className="flex flex-col gap-4 py-4">
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
                    <PostLikes likes={data.likes} />
                    <PostCommentInput />
                    <CommentList comments={data.comments} />
                </>
            ) : (
                <div className="flex flex-col gap-4 py-4">
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

const CommentList = ({ comments }: { comments: IComment[] | undefined }) => {
    return (
        <ul className="mt-2 flex w-full flex-col gap-4">
            {comments &&
                comments?.length > 0 &&
                comments.map((comment) => (
                    <PostComment key={comment._id} comment={comment} />
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
