import { getPostById } from '@/service/posts.service'
import { getServerSessionUser } from '@/lib/action'
import ImageLightBox from '@/components/ImageLightBox'

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const user = await getServerSessionUser()
    let photoUrl
    if (user && user?.token) {
        const post = await getPostById(user?.token, id)
        photoUrl = post.photo
    }
    
    return (
        <ImageLightBox photoUrl={photoUrl} />
    )
}
