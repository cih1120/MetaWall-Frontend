import { HandThumbUpIcon, BellIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'
import Image from 'next/image'

type asideListType = { type: string; value: string; icon: string }
export default function Aside() {
    const asideList: asideListType[] = [
        { type: 'avatar', value: '邊緣小杰', icon: '' },
        { type: 'follow', value: '追蹤名單', icon: 'Bell' },
        { type: 'like', value: '我按讚的文章', icon: 'ThumbsUp' },
    ]
    return (
        <aside className="w-full border-2 border-gray-dark bg-white px-6 py-9">
            <button className="w-full rounded-lg border-2 border-gray-dark bg-primary py-4 font-bold text-white shadow-[-2px_2px_0_#000400] transition hover:-translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                張貼動態
            </button>
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
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-gray-dark bg-primary">
                {listItem.type == 'avatar' ? (
                    <Image
                        width={50}
                        height={50}
                        alt={listItem.value}
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                ) : (
                    Icon
                )}
            </div>
            <p className=" text-medium">{listItem.value}</p>
        </li>
    )
}
