import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto(
  {
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
  }
)

export const metadata: Metadata = {
  title: 'Short.Link',
  description: 'Generate short URLs for your long URLs with ease'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
  )
}
