import Header from '@/components/Header'
import AddPostModal from '@/components/Modals/AddPost'

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section>
            <Header />
            <main className="mx-auto max-w-4xl py-10">{children}</main>
            <AddPostModal />
        </section>
    )
}
