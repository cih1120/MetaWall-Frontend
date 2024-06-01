'use client'
import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from '@/store/user/userStore'
import { getSessionUser } from '@/lib/utils'
import { getUserProfile } from '@/service/auth.service'

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { init } = useUserStore()
    const user = getSessionUser()
    useEffect(() => {
        const fetchAndInitUser = async () => {
            if (user) {
                const userProfile = await getUserProfile(user.token)
                init(userProfile)
            }
        }

        fetchAndInitUser()
    }, [user])
    return (
        <NextUIProvider>
            {children}
            <Toaster />
        </NextUIProvider>
    )
}
