import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ThemeSwitcher from '@/components/toggles/theme-switcher'
import { ThemeProvider } from './theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home',
  description: 'track-it Homepage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isHome = true;
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-darkColor1`} >
        <ThemeProvider>
          <header>
            { !isHome &&
              <section className='flex ml-3 mt-3'>
                <ThemeSwitcher />
              </section>
            }
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
