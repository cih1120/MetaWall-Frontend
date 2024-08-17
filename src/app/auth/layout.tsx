import { redirect } from 'next/navigation'
import Image from 'next/image'
import welcome_img from './img.svg'
import { getServerSessionUser } from '@/lib/action'

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getServerSessionUser()
    if (user) {
        redirect('/')
    }
    return (
        <section className="flex w-full justify-center py-4 md:h-screen md:items-center">
            <div className="back-rectangle relative flex h-fit min-h-[430px] w-11/12 max-w-3xl items-center justify-center border-2 border-gray-dark bg-gray-light px-5 py-6">
                <div className="flex w-full flex-col-reverse items-center justify-between gap-y-6 md:flex-row md:space-x-11">
                    <Image
                        src={welcome_img}
                        width={350}
                        height={340}
                        alt="MetaWall"
                        className="w-72 md:w-[350px]"
                    />
                    {children}
                </div>
            </div>
        </section>
    )
}
