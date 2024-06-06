'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HandThumbUpIcon, BellIcon } from '@heroicons/react/24/solid'
import { addPostModalStore } from '@/store/modal/modalStore'
import MainButton from '../../Form/FormComponents/MainButton'
import { MenuType } from '../FloatingMenu'
import { useUserStore } from '@/store/user/userStore'

export default function Aside() {
    const { onOpen } = addPostModalStore()
    const pathname = usePathname()
    const id = useUserStore((state) => state.id)
    const asideMenu: MenuType[] = [
        {
            type: 'link',
            value: '追蹤名單',
            icon: <BellIcon className="size-6 text-primary-light" />,
            url: `/following/${id}`,
        },
        {
            type: 'link',
            value: '我按讚的文章',
            icon: <HandThumbUpIcon className="size-6 text-primary-light" />,
            url: '/',
        },
    ]

    return (
        <aside className="sticky top-24 h-fit w-full border-2 border-gray-dark bg-white px-6 py-9">
            {pathname === '/' && (
                <MainButton
                    background="accent"
                    className="mb-6"
                    solid="strong"
                    onClick={onOpen}
                >
                    張貼動態
                </MainButton>
            )}
            <ul className="flex flex-col justify-center gap-5">
                {asideMenu.map((item) => {
                    return <AsideList key={item.value} listItem={item} />
                })}
            </ul>
        </aside>
    )
}

const AsideList = function ({ listItem }: { listItem: MenuType }) {
    return (
        <li>
            <Link
                className="flex items-center gap-4"
                href={listItem.type === 'link' ? listItem.url : '/'}
            >
                <MainButton
                    background="normal"
                    shape="round"
                    className="h-12 w-12"
                >
                    {listItem.icon}
                </MainButton>
                <p className=" text-medium">{listItem.value}</p>
            </Link>
        </li>
    )
}
