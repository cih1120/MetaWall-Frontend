import Aside from '@/components/Aside'
import Posts from '@/components/Posts'
import { getPosts } from '@/service/posts.service'

export default async function IndexPage() {
    const posts = await getPosts()

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
