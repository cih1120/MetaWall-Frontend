import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface IButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
        VariantProps<typeof buttonVariants> {
    buttonType?: 'button' | 'submit' | 'reset'
}

const buttonVariants = cva(
    'w-full flex items-center overflow-hidden justify-center border-2 border-gray-dark py-4 font-bold transition',
    {
        variants: {
            background: {
                primary: 'bg-primary text-white',
                accent: 'bg-accent text-black',
                normal: 'bg-primary text-primary-light',
            },
            shape: {
                round: 'rounded-full',
                square: 'rounded-lg',
            },
            solid: {
                normal: '',
                strong: 'shadow-[-2px_2px_0_#000400] hover:-translate-x-0.5 hover:translate-y-0.5 hover:shadow-none',
            },
        },
        defaultVariants: {
            background: 'primary',
            shape: 'square',
            solid: 'normal',
        },
    }
)

export default function Button({
    background,
    shape,
    solid,
    children,
    className,
    buttonType,
    ...props
}: IButtonProps) {
    return (
        <button
            className={twMerge(
                clsx(buttonVariants({ background, shape, solid })),
                className
            )}
            type={buttonType ? buttonType : 'button'}
            {...props}
        >
            {children}
        </button>
    )
}
