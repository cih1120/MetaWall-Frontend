import Header from '@/components/Header'
import AddPostModal from '@/components/Modals/AddPost'

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="pt-20">
            <Header />
            <main className="mx-auto max-w-4xl py-2 md:py-10">{children}</main>
            <AddPostModal />
        </section>
    )
}
