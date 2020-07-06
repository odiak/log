import { FC, useState, useCallback } from 'react'
import { Post } from '../services/common/Post'
import marked, { MarkedOptions } from 'marked'
import Link from 'next/link'
import css from './ShowPost.module.scss'
import { format } from 'date-fns'
import { postService } from '../services/client/postService'
import TextareaAutosize from 'react-textarea-autosize'

const markdownOptions: MarkedOptions = {
  breaks: true,
  gfm: true
}

export const ShowPost: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={css.post}>
      <div className={css.date}>
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
          <a>{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:SS')}</a>
        </Link>
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(post.body, markdownOptions) }}></div>
    </div>
  )
}

export const ShowPostEditable: FC<{
  post: Post
  onDelete?: () => void
  onUpdate?: (newPost: Post) => void
}> = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)

  const [bodyDraft, setBodyDraft] = useState('')
  const savePost = useCallback(async () => {
    const newPost = await postService.updatePost(post.id, { body: bodyDraft })
    onUpdate?.(newPost)
    setIsEditing(false)
  }, [bodyDraft])

  return (
    <div className={css.post}>
      <div className={css.buttons}>
        {isEditing ? (
          <>
            <button
              onClick={() => {
                setIsEditing(false)
              }}
            >
              cancel
            </button>
            <button onClick={savePost}>save</button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEditing(true)
                setBodyDraft(post.body)
              }}
            >
              edit
            </button>
            <button
              onClick={async () => {
                if (!confirm('Are you sure to delete post?')) return

                await postService.deletePost(post.id)
                onDelete?.()
              }}
            >
              delete
            </button>
          </>
        )}
      </div>
      <div className={css.date}>
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
          <a>{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:SS')}</a>
        </Link>
      </div>
      {isEditing ? (
        <TextareaAutosize
          minRows={4}
          className={css.textarea}
          value={bodyDraft}
          onChange={(e) => {
            setBodyDraft(e.target.value)
          }}
        ></TextareaAutosize>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: marked(post.body, markdownOptions) }}></div>
      )}
    </div>
  )
}
