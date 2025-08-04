'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function SessionProvider({ children }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <NextAuthSessionProvider basePath={basePath}>
      {children}
    </NextAuthSessionProvider>
  )
}
