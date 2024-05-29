import Aside from '@/components/Aside'
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

    return (
        <section className="flex w-full gap-6">
            <div className="shrink-0 basis-8/12">
                <Posts posts={posts} />
            </div>
            <div className="w-full shrink grow">
                <Aside />
            </div>
        </section>
    )
}
