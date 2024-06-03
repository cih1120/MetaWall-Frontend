import Image from 'next/image'
import {
    Avatar as NextUiAvatar,
    AvatarProps as NextUiAvatarProps,
} from '@nextui-org/react'
import defaultImg from './user_default.jpg'

interface AvatarProps extends NextUiAvatarProps {
    src: string | undefined
    name: string
}

export default function Avatar({
    src,
    name,
    className,
    isBordered = true,
    ...props
}: AvatarProps) {
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
            {...props}
        ></NextUiAvatar>
    )
}
