import FloatingMenu from '@/components/FloatingMenu'
import Posts from '@/components/Posts'
import { getServerSessionUser } from '@/lib/action'
import { getPosts } from '@/service/posts.service'
import { IPost } from '@/types'

export default async function IndexPage() {
    const user = await getServerSessionUser()
    let posts: IPost[] = []
    if (user && user?.token) {
        posts = await getPosts(user?.token)
    }

    return <Posts posts={posts} />
}
