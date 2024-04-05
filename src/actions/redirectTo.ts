'use server'
import { redirect } from 'next/navigation'
 
export async function navigate(longUrl: string) {
  redirect(longUrl)
}

export default navigate