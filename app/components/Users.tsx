'use client'

import { getUsers } from '@/app/api'
import type { IUser } from '@/app/types'
import { useQuery } from '@tanstack/react-query'

export default function Component() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (isPending) return <div>Loading...</div>

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='mt-3'>
      {data.map((user: IUser) => (
        <div key={user.id}>
          <h2 className='text-xl font-bold'>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}

      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}
