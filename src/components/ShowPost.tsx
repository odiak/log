import { FC } from 'react'
import { Post } from '../services/common/Post'
import marked from 'marked'
import Link from 'next/link'
import css from './ShowPost.module.scss'
import { format } from 'date-fns'

export const ShowPost: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={css.post}>
      <div className={css.date}>
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
          <a>{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:SS')}</a>
        </Link>
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(post.body) }}></div>
    </div>
  )
}
