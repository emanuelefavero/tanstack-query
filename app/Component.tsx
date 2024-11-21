'use client'

import { useQuery } from '@tanstack/react-query'
import type { IUser } from './types'

export default function Component() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return await response.json()
    },
  })

  if (isPending) return <div>Loading...</div>

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      {data.map((user: IUser) => (
        <div key={user.id}>
          <h2 className='text-xl font-bold'>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}

      <div>{isFetching ? 'Updating...' : ''}</div>
    </>
  )
}
