import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import welcome_img from './img.svg'

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect('/')
    }
    return (
        <section className="flex h-screen w-full items-center justify-center">
            <div className="back-rectangle relative flex h-fit min-h-[430px] w-9/12 max-w-3xl items-center justify-center border-2 border-gray-dark bg-gray-light py-6">
                <div className="flex justify-between space-x-11">
                    <Image
                        src={welcome_img}
                        width={350}
                        height={340}
                        alt="MetaWall"
                        className=""
                    />
                    {children}
                </div>
            </div>
        </section>
    )
}
