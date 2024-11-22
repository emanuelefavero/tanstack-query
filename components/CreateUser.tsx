'use client'

import { createUser } from '@/utils/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    onError: (error) => {
      console.error('An error occurred:', error)
    },
  })

  return (
    <>
      <p className='mb-2 mt-3 max-w-prose'>
        Note: This is a mock API (json placeholder) so the user will not
        actually be created but you can still see the mutation in action.
      </p>
      <button
        className={`mt-3 rounded-md px-4 py-2 font-bold text-white ${
          mutation.isPending
            ? 'cursor-not-allowed bg-zinc-400 opacity-80'
            : mutation.isSuccess
              ? 'bg-green-500'
              : 'bg-orange-500'
        }`}
        type='submit'
        onClick={() => {
          // Create user (in a real application you would use a form and pass the form data to the mutation)
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
