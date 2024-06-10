import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '@/store/user/userStore'
import { IFollow } from '@/types'
import { useSessionUser } from '@/lib/utils'
import { revalidateUserPage } from '@/lib/action'
import { unFollowUser, followUser } from '@/service/user.service'
import MainButton from '@/components/Form/FormComponents/MainButton'

export default function FollowButton({
    userId,
    followers,
}: {
    userId: string
    followers: IFollow[]
}) {
    const loggedInUse = useSessionUser()
    const [loggedInUserId] = useUserStore(useShallow((state) => [state.id]))

    const isFollowingUser = useMemo(() => {
        return followers.some((follower) => {
            return follower.user._id === loggedInUserId
        })
    }, [loggedInUserId, followers])

    const handleFollow = async () => {
        await followUser(userId, loggedInUse!.token)
        await revalidateUserPage()
    }

    const handleUnFollow = async () => {
        await unFollowUser(userId, loggedInUse!.token)
        await revalidateUserPage()
    }

    return (
        <MainButton
            background={isFollowingUser ? 'normal' : 'accent'}
            solid={'strong'}
            className="w-auto p-3"
            onClick={isFollowingUser ? handleUnFollow : handleFollow}
        >
            {isFollowingUser ? '取消追蹤' : '追蹤'}
        </MainButton>
    )
}
