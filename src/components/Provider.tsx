'use client'
import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from '@/store/user/userStore'
import { useSessionUser } from '@/lib/utils'
import { getUserProfile } from '@/service/auth.service'

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { init } = useUserStore()
    const user = useSessionUser()
    useEffect(() => {
        const fetchAndInitUser = async () => {
            if (user) {
                const userProfile = await getUserProfile(user.token)
                init(userProfile)
            }
        }

        fetchAndInitUser()
    }, [user, init])
    return (
        <NextUIProvider>
            {children}
            <Toaster />
        </NextUIProvider>
    )
}
