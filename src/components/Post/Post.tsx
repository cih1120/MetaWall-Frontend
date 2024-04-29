import Link from 'next/link'
import Image from 'next/image'
import { IComment, IPost } from '@/types'
import PostHeader from './PostHeader'
import PostComment from './PostComment'
import PostLikes from './PostLikes'
import PostCommentInput from './PostCommentInput'

export default function Post({ data }: { data: IPost }) {
    return (
        <li className="block rounded-lg border-2 border-gray-dark bg-white p-6 shadow-[0_2px_0_#000400]">
            <div className="flex flex-col gap-4 py-4">
                <PostHeader author={data.author} date={data.date} />
                <p>{data.content}</p>
                {data.photo && <PostPhoto src={data.photo} />}
            </div>
            <PostLikes likes={data.likes} />
            <PostCommentInput />
            <CommentList comments={data.comments} />
        </li>
    )
}

const CommentList = ({ comments }: { comments: IComment[] | undefined }) => {
    return (
        <ul className="mt-2 flex w-full flex-col gap-4">
            {comments &&
                comments?.length > 0 &&
                comments.map((comment) => (
                    <PostComment key={comment.id} comment={comment} />
                ))}
        </ul>
    )
}

const PostPhoto = ({ src }: { src: IPost['photo'] }) => {
    return (
        <Image
            src={src!}
            width={500}
            height={157}
            alt=""
            className="mb-4 max-h-[157px] w-full rounded-lg border-2 border-gray-dark object-cover"
        />
    )
}
