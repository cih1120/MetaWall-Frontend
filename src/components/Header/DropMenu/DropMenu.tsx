'use client'
import Avatar from '@/components/Avatar'
import { useUserStore } from '@/store/user/userStore'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function DropMenu() {
    const { name, avatar } = useUserStore()
    return (
        <button className="group relative flex gap-2">
            <Avatar src={avatar} name={name} />
            <h5 className="border-0 border-b-4 border-gray-dark font-paytoneOne">
                {name}
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
