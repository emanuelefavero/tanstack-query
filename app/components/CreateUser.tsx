'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api'

export default function Component() {
  const queryClient = useQueryClient() // access the client

  // Mutations (create user)
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onSettled: () => {
      // set mutation.isSuccess to false after 2 seconds (this will reset the button appearance)
      setTimeout(() => {
        mutation.reset()
      }, 2000)
    },
  })

  // Render Create User
  return (
    <>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        type='submit'
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            name: 'John Doe',
            email: 'john@email.com',
          })
        }}
      >
        {mutation.isPending
          ? 'Creating...'
          : mutation.isSuccess
            ? 'Created!'
            : 'Create User'}
      </button>
    </>
  )
}
