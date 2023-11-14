import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Nav from '@/components/ui/navbar/Nav'
import './globals.css'

const inter = Poppins({ weight:'400',preload:false })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>Contact</title>
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}