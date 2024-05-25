import { useMemo } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { Avatar } from '@nextui-org/react'
import { IUser } from '@/types'

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
            <Avatar
                isBordered
                src={
                    user?.avatar ||
                    'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                }
            />
            <div>
                <Link href="/" className="font-bold">
                    {user.name}
                </Link>
                <p className="text-xs font-extralight text-gray">
                    {formattedDate}
                </p>
            </div>
        </div>
    )
}
