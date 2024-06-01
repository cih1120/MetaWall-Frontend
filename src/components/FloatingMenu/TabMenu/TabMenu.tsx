import React, { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { addPostModalStore } from '@/store/modal/modalStore'
import {
    HomeIcon,
    HandThumbUpIcon,
    BellIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

interface BaseTabMenu {
    icon: ReactNode
}

interface LinkTabMenu extends BaseTabMenu {
    type: 'link'
    onClick: string
}

interface ModalTabMenu extends BaseTabMenu {
    type: 'modal'
    onClick: () => void
}

type TabMenuType = LinkTabMenu | ModalTabMenu

export default function TabMenu() {
    const { onOpen } = addPostModalStore()
    const tabMenu: TabMenuType[] = [
        {
            type: 'link',
            icon: <HomeIcon className="size-6 text-primary-light" />,
            onClick: '/',
        },
        {
            type: 'link',
            icon: <BellIcon className="size-6 text-primary-light" />,
            onClick: '/',
        },
        {
            type: 'link',
            icon: <HandThumbUpIcon className="size-6 text-primary-light" />,
            onClick: '/',
        },
        {
            type: 'modal',
            icon: <PlusIcon className="size-6" />,
            onClick: onOpen,
        },
    ]
    return (
        <ul className="fixed bottom-3 flex w-8/12 max-w-80 justify-around rounded-full border-2 border-b-4 border-gray-dark bg-gray-light px-4 py-2 md:hidden">
            {tabMenu.map((tab, index) => {
                return <TabMenuButton key={index} data={tab} />
            })}
        </ul>
    )
}

function TabMenuButton({ data }: { data: TabMenuType }) {
    const router = useRouter()
    const handleClick = () => {
        if (data.type === 'link') {
            router.push(data.onClick)
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
