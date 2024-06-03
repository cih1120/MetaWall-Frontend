'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

/**
 * action.ts
 * 
 * 本檔案包含常用的伺服器端函數，用於處理伺服器邏輯和資料重新驗證等操作。
 * 
 * 用於：Server端
 */

export async function revalidateIndexPost() {
  revalidateTag('post')
  revalidatePath('/', 'page')
}

export async function revalidateUserPage() {
  revalidateTag('user')
  revalidatePath("/[:id]", 'page')
}

export async function getServerSessionUser() {
  const res = await getServerSession(authOptions)
  return res?.user || null
}