import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { DM_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Storyboard app',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Link href="/"> HOME </Link> */}
        {children}
        <Toaster />
      </body>
    </html>
  )
}
