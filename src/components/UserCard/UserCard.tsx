'use client'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { IUserProfile } from '@/types'
import { useUserStore } from '@/store/user/userStore'
import FollowButton from './FollowButton'
import Avatar from '../Avatar'

export default function UserCard({ userInfo }: { userInfo: IUserProfile }) {
    const loggedInUserId = useUserStore(useShallow((state) => state.id))

    const isCurrentUser = useMemo(() => {
        return loggedInUserId === userInfo.id
    }, [loggedInUserId, userInfo.id])

    return (
        <div className="back-rectangle relative z-10 mb-3 w-full before:rounded-md">
            <div className="flex w-full rounded-md border-2 border-gray-dark bg-white">
                <div className="border-r-2 border-gray-dark">
                    <Avatar
                        src={userInfo.avatar}
                        name={userInfo.name}
                        size="lg"
                        className="h-16 w-16 rounded-none"
                        isBordered={false}
                    />
                </div>
                <div className="flex flex-1 items-center justify-between px-3">
                    <div>
                        <h3 className="font-bold">{userInfo.name}</h3>
                        <h5>{userInfo.followers.length} 人追蹤</h5>
                    </div>

                    {!isCurrentUser && (
                        <FollowButton
                            userId={userInfo.id}
                            followers={userInfo.followers}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
