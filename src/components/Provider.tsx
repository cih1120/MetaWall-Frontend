'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <NextUIProvider>
            {children}
            <Toaster />
        </NextUIProvider>
    )
}
