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

    return (
        <section className="flex w-full justify-center gap-6 md:justify-start">
            <div className="w-full shrink-0 grow basis-auto px-6 md:grow-0 md:basis-8/12 md:px-0">
                <Posts posts={posts} />
            </div>
                <FloatingMenu />
        </section>
    )
}
