'use client'

import { Montserrat } from 'next/font/google'

import ApolloClientContextProvider from 'contexts/ApolloClientContextProvider'
import { ToastProvider } from 'contexts/ToastContext'

import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} antialiased`}>
        <ToastProvider>
          <ApolloClientContextProvider>{children}</ApolloClientContextProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
