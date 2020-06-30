export interface Post {
  id: string
  createdAt: number
  body: string
}

export function decodePost(raw: { id: string; data: () => any }): Post {
  const { body, createdAt } = raw.data()
  const createdAtMillis =
    typeof createdAt.toMillis === 'function' ? createdAt.toMillis() : createdAt

  return {
    id: raw.id,
    body: body || '',
    createdAt: createdAtMillis
  }
}
