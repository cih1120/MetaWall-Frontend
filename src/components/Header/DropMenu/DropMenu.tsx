'use client'
import { Avatar } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function DropMenu() {
    return (
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
                        <a
                            onClick={() => signOut()}
                            className="block px-4 py-2 hover:bg-block"
                        >
                            登出
                        </a>
                    </li>
                </ul>
            </div>
        </button>
    )
}
