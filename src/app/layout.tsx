import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {GAME_DESCRIPTION, GAME_TITLE} from "@/app/utils/constants";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: GAME_TITLE,
  description: GAME_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
