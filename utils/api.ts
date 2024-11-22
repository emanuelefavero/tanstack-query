import type { IUser } from '@/types'

export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
}

export async function getUser(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  )
  return await response.json()
}

export async function createUser(user: IUser) {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  return await response.json()
}
