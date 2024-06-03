import React, { ReactNode, useMemo } from 'react'
import { Button } from '@nextui-org/react'
import { addPostModalStore } from '@/store/modal/modalStore'
import {
    HomeIcon,
    HandThumbUpIcon,
    BellIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import { MenuType } from '../FloatingMenu'

export default function TabMenu() {
    const { onOpen } = addPostModalStore()
    const pathName = usePathname()

    const homePageButtons: MenuType[] = [
        {
            type: 'modal',
            icon: <PlusIcon className="size-6" />,
            onClick: onOpen,
        },
    ]

    const commonPageButtons: MenuType[] = [
        {
            type: 'link',
            icon: <HomeIcon className="size-6 text-primary-light" />,
            url: '/',
        },
        {
            type: 'link',
            icon: <BellIcon className="size-6 text-primary-light" />,
            url: '/',
        },
        {
            type: 'link',
            icon: <HandThumbUpIcon className="size-6 text-primary-light" />,
            url: '/',
        },
    ]

    const tabMenuButtons: MenuType[] = useMemo(() => {
        return pathName === '/'
            ? [...homePageButtons, ...commonPageButtons]
            : commonPageButtons
    }, [pathName])

    return (
        <ul className="fixed bottom-3 flex w-8/12 max-w-80 justify-around rounded-full border-2 border-b-4 border-gray-dark bg-gray-light px-4 py-2 md:hidden">
            {tabMenuButtons.map((tab, index) => {
                return <TabMenuButton key={index} data={tab} />
            })}
        </ul>
    )
}

function TabMenuButton({ data }: { data: MenuType }) {
    const router = useRouter()
    const handleClick = () => {
        if (data.type === 'link') {
            router.push(data.url)
        } else if (data.type === 'modal') {
            data.onClick()
        }
    }
    return (
        <li>
            <Button
                radius="full"
                isIconOnly
                size="lg"
                onClick={handleClick}
                className={`border-2 border-gray-dark bg-primary ${data.type === 'modal' ? 'bg-accent' : 'bg-primary'}`}
            >
                {data.icon}
            </Button>
        </li>
    )
}
