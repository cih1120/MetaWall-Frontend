'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { IUserProfile } from '@/types'
import { useUserStore } from '@/store/user/userStore'
import { useEffect } from 'react'

export default function Provider({
    user,
    children,
}: Readonly<{
    user: IUserProfile | undefined
    children: React.ReactNode
}>) {
    const { init } = useUserStore()
    useEffect(() => {
        if (user) {
            init(user)
        }
    }, [user])
    return (
        <NextUIProvider>
            {children}
            <Toaster />
        </NextUIProvider>
    )
}
