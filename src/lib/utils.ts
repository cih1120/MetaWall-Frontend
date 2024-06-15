import { useSession } from 'next-auth/react'

/**
 * utils.ts
 * 
 * 包含常用的客戶端函數，用於各種前端操作。
 * 
 * 用於：Client 端
 */

export const useSessionUser = () => {
  const { data: session } = useSession()
  return session || null
}

export const debounce = (func: Function, wait: number = 50) => {
  let timeout: number;

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}

// 將dataURL轉換為File
export const dataUrlToFileUsingFetch = async (
  url: string,
  fileName: string,
  mimeType: string
) => {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  return new File([buffer], fileName, { type: mimeType })
}