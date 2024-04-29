import { useMemo } from 'react'
import Link from 'next/link'
import { Avatar } from '@nextui-org/react'
import { IUser } from '@/types'

export interface IPostHeader {
    author: IUser
    date: Date
}

export default function PostHeader({ author, date }: IPostHeader) {
    const formattedDate = useMemo(() => {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    }, [date])
    return (
        <div className="flex gap-4">
            <Avatar isBordered src={author.avatar} />
            <div>
                <Link href="/" className="font-bold">
                    {author.name}
                </Link>
                <p className="text-xs font-extralight text-gray">
                    {formattedDate}
                </p>
            </div>
        </div>
    )
}
