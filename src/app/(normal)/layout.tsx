import Header from '@/components/Header'
import AddPostModal from '@/components/Modals/AddPost'
import FloatingMenu from '@/components/FloatingMenu'

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="pt-20">
            <Header />
            <main className="mx-auto max-w-4xl py-2 md:py-10">
                <section className="flex w-full justify-center gap-6 md:justify-start">
                    <div className="w-full shrink-0 grow basis-auto px-4 md:grow-0 md:basis-8/12 md:px-0">
                        {children}
                    </div>
                    <FloatingMenu />
                </section>
            </main>

            <AddPostModal />
        </section>
    )
}
