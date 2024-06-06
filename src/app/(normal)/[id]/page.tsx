import Posts from '@/components/Posts'
import { getPostByUser } from '@/service/posts.service'
import { getServerSessionUser } from '@/lib/action'
import { IPost, IUserProfile } from '@/types'
import { getUserProfileById } from '@/service/user.service'
import UserCard from '@/components/Posts/UserInfo'

export default async function UserPage({ params }: { params: { id: string } }) {
    const id = params.id
    const user = await getServerSessionUser()
    let posts: IPost[] = []
    let userInfo: IUserProfile | null = null

    if (user && user?.token) {
        posts = await getPostByUser(user?.token, id)
        userInfo = await getUserProfileById(id, user?.token)
    }

    return (
        <>
            {userInfo && <UserCard userInfo={userInfo} />}
            <Posts posts={posts} userId={id} />
        </>
    )
}
