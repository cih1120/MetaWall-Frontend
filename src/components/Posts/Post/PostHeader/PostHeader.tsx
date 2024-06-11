import { useMemo } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { IUser } from '@/types'
import Avatar from '@/components/Avatar'

export interface IPostHeader {
    user: IUser
    createdAt: Date
}

export default function PostHeader({ user, createdAt }: IPostHeader) {
    const formattedDate = useMemo(() => {
        return moment(createdAt).format('YYYY/MM/DD HH:mm')
    }, [createdAt])
    return (
        <div className="flex gap-4">
            <Avatar src={user?.avatar} name={user?.name} />
            <div>
                <Link href={`/${user?._id}`} className="font-bold">
                    {user?.name}
                </Link>
                <p className="text-xs font-extralight text-gray">
                    {formattedDate}
                </p>
            </div>
        </div>
    )
}
