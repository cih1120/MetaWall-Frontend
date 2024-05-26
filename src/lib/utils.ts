import { useSession } from 'next-auth/react'

export const getSessionUser = () => {
  const { data: session } = useSession()
  return session?.user || null
}