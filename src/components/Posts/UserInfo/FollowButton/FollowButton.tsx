import { useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '@/store/user/userStore'
import { IFollow } from '@/types'
import { useSessionUser } from '@/lib/utils'
import { revalidateUserPage } from '@/lib/action'
import { unFollowUser, followUser } from '@/service/user.service'
import MainButton from '@/components/Form/FormComponents/MainButton'
import toast from 'react-hot-toast'

export default function FollowButton({
    userId,
    followers,
}: {
    userId: string
    followers: IFollow[]
}) {
    const loggedInUse = useSessionUser()
    const [loggedInUserId] = useUserStore(useShallow((state) => [state.id]))
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isFollowingUser = useMemo(() => {
        return followers.some((follower) => {
            return follower.user.id === loggedInUserId
        })
    }, [loggedInUserId, followers])

    const handleFollow = async () => {
        try {
            setIsLoading(true)
            await followUser(userId, loggedInUse!.token)
            await revalidateUserPage()
        } catch {
            toast.error('系統錯誤，請稍後重新嘗試。')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnFollow = async () => {
        try {
            setIsLoading(true)
            await unFollowUser(userId, loggedInUse!.token)
            await revalidateUserPage()
        } catch {
            toast.error('系統錯誤，請稍後重新嘗試。')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <MainButton
            isLoading={isLoading}
            background={isFollowingUser ? 'normal' : 'accent'}
            solid={'strong'}
            className="w-auto p-3"
            onClick={isFollowingUser ? handleUnFollow : handleFollow}
        >
            {isFollowingUser ? '取消追蹤' : '追蹤'}
        </MainButton>
    )
}
