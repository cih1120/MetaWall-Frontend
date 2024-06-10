import { getServerSessionUser } from '@/lib/action'
import { getUserProfileById } from '@/service/user.service'
import PageTitle from '@/components/PageTitle'
import UserCard from '@/components/UserCard'

export default async function FollowingPage({
    params,
}: {
    params: { id: string }
}) {
    const id = params.id
    const user = await getServerSessionUser()
    const userInfo = await getUserProfileById(id, user!.token)
    return (
        <>
            <PageTitle title={'我的追蹤名單'} />
            {userInfo.following.map((followingUser) => {
                return <UserCard key={followingUser.user._id} userInfo={followingUser} />
            })}
        </>
    )
}
