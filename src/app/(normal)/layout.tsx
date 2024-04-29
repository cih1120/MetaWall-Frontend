import Link from 'next/link'
import { Avatar } from '@nextui-org/react'

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section>
            <header className="border-0 border-b-3 border-gray-dark bg-white px-2 py-4">
                <div className="mx-auto flex max-w-[872px] justify-between">
                    <h1 className="font-paytoneOne text-2xl">MetaWall</h1>
                    <button className="group relative flex gap-2">
                        <Avatar
                            isBordered
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        <h5 className="border-0 border-b-4 border-gray-dark font-paytoneOne">
                            Member
                        </h5>
                        <div className="back-rectangle absolute left-0 top-full">
                            <ul className="hidden w-max border-2 border-gray-dark bg-white group-hover:block">
                                <li className="border-b-1 border-gray-dark">
                                    <Link
                                        href="/"
                                        className="block px-4 py-2 hover:bg-block"
                                    >
                                        我的貼文牆
                                    </Link>
                                </li>
                                <li className="border-b-1 border-gray-dark last:border-b-0">
                                    <Link
                                        href="/"
                                        className="block px-4 py-2 hover:bg-block"
                                    >
                                        我的貼文牆
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
            </header>
            <main className="mx-auto max-w-4xl py-10">{children}</main>
        </section>
    )
}
