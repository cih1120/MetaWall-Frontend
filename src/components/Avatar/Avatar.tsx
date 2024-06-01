import Image from 'next/image'
import { Avatar as NextUiAvatar } from '@nextui-org/react'
import defaultImg from './user_default.jpg'

export default function Avatar({
    src,
    name,
    className,
    isBordered = true,
}: {
    src: string | undefined
    name: string
    className?: string,
    isBordered?: boolean
}) {
    return (
        <NextUiAvatar
            isBordered={isBordered}
            className={className}
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
