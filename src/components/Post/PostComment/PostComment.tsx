import PostHeader from '../PostHeader'
import { IComment } from '@/types'

export default function PostComment({ comment }: { comment: IComment }) {
    return (
        <li className="block w-full rounded-xl bg-gray-light px-4 py-5">
            <PostHeader author={comment.author} date={comment.date} />
            <p className="mt-1.5 pl-14">{comment.content}</p>
        </li>
    )
}
