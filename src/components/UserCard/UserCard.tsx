import { useMemo } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { IFollow } from '@/types'
import Avatar from '../Avatar'
export default function UserCard({ userInfo }: { userInfo: IFollow }) {
    const user = userInfo.user

    const formattedDate = useMemo(() => {
        return moment(userInfo.createdAt).format('YYYY/MM/DD HH:mm')
    }, [userInfo.createdAt])

    const calculateDaysPassed = (createdAt: Date): number => {
        const createdAtDate = new Date(createdAt)
        const now = new Date()
        const timeDifference = now.getTime() - createdAtDate.getTime()
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    }

    const daysPassed = useMemo(
        () => calculateDaysPassed(userInfo.createdAt),
        [userInfo.createdAt]
    )

    return (
        <div className="back-rectangle relative z-10 mb-3 w-full before:rounded-md">
            <div className="flex w-full items-end rounded-md border-2 border-gray-dark bg-white px-4 py-5">
                <Avatar src={user.avatar} name={user.name} isBordered={false} />
                <div className="flex flex-1 items-center justify-between px-3">
                    <Link href={`/${user._id}`}>
                        <div>
                            <h3 className="font-bold">{user.name}</h3>
                            <h5 className="text-xs font-extralight text-gray">
                                追蹤日期： {formattedDate}
                            </h5>
                        </div>
                    </Link>
                </div>
                <h4 className="text-sm">您已追蹤 {daysPassed} 天！</h4>
            </div>
        </div>
    )
}
