import Image from 'next/image'
import { Avatar as NextUiAvatar } from '@nextui-org/react'
import defaultImg from './user_default.jpg'

export default function Avatar({
    src,
    name,
    isBordered = true,
}: {
    isBordered?: boolean
    src: string | undefined
    name: string
}) {
    return (
        <NextUiAvatar
            isBordered={isBordered}
            classNames={{ fallback: 'h-full w-full' }}
            fallback={
                <Image
                    alt={name}
                    className="h-full w-full"
                    fill={true}
                    src={src || defaultImg}
                />
            }
        ></NextUiAvatar>
    )
}
