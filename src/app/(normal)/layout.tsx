import { getServerSessionUser } from '@/lib/action'
import Header from '@/components/Header'
import AddPostModal from '@/components/Modals/AddPost'

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    // const user = await getServerSessionUser()
    return (
        <section>
            <Header />
            <main className="mx-auto max-w-4xl py-10">{children}</main>
            <AddPostModal />
        </section>
    )
}
