'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Users from './components/Users'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className='text-3xl font-bold'>Tanstack Query</h1>
      <Users />
    </QueryClientProvider>
  )
}
