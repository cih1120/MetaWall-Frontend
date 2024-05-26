'use server'

import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export async function revalidateIndexPost() {
  revalidateTag('post')
  revalidatePath('/', 'page')
}