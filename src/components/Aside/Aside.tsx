'use client'
import { useMemo } from 'react'
import Image from 'next/image'
import { HandThumbUpIcon, BellIcon } from '@heroicons/react/24/solid'
import { addPostModalStore } from '@/store/modal/modalStore'
import MainButton from '../Form/FormComponents/MainButton'

type asideListType = { type: string; value: string; icon: string }
export default function Aside() {
    const { onOpen } = addPostModalStore()
    const asideList: asideListType[] = [
        { type: 'follow', value: '追蹤名單', icon: 'Bell' },
        { type: 'like', value: '我按讚的文章', icon: 'ThumbsUp' },
    ]

    return (
        <aside className="w-full border-2 border-gray-dark bg-white px-6 py-9">
            <MainButton background="accent" solid="strong" onClick={onOpen}>
                張貼動態
            </MainButton>
            <ul className="mt-6 flex flex-col justify-center gap-5">
                {asideList.map((item) => {
                    return <AsideList key={item.type} listItem={item} />
                })}
            </ul>
        </aside>
    )
}

const AsideList = function ({ listItem }: { listItem: asideListType }) {
    const Icon = useMemo(() => {
        if (listItem.icon == 'Bell') {
            return <BellIcon className="size-6 text-primary-light" />
        } else {
            return <HandThumbUpIcon className="size-6 text-primary-light" />
        }
    }, [listItem])
    return (
        <li className="flex items-center gap-4">
            <MainButton background="normal" shape="round" className="h-12 w-12">
                {Icon}
            </MainButton>
            <p className=" text-medium">{listItem.value}</p>
        </li>
    )
}
