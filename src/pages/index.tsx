import { GetServerSideProps } from 'next'
import { postService as adminPostService } from '../services/admin/postService'
import { postService as clientPostService } from '../services/client/postService'
import { Post } from '../services/common/Post'
import { useState, useEffect } from 'react'
import { ShowPost, ShowPostEditable } from '../components/ShowPost'
import css from './index.module.scss'
import { authService } from '../services/client/authService'
import TextareaAutosize from 'react-textarea-autosize'

const Home = ({
  posts: initialPosts,
  hasNext: initialHasNext
}: {
  posts: Array<Post>
  hasNext: boolean
}) => {
  const [posts, setPosts] = useState(initialPosts)
  const [body, setBody] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasNext, setHasNext] = useState(initialHasNext)

  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts])

  useEffect(() => {
    return authService.onAuthStateChanged(({ signedIn }) => {
      setIsAuthenticated(signedIn)
    })
  }, [initialPosts])

  return (
    <>
      {isAuthenticated && (
        <div>
          <TextareaAutosize
            minRows={3}
            className={css.textarea}
            value={body}
            onChange={(e) => {
              setBody(e.target.value)
            }}
          ></TextareaAutosize>
          <button
            onClick={() => {
              ;(async () => {
                const newPost = await clientPostService.createPost({ body })
                setBody('')
                setPosts((ps) => [newPost].concat(ps))
              })()
            }}
          >
            post
          </button>
        </div>
      )}
      {isAuthenticated
        ? posts.map((post) => (
            <ShowPostEditable
              key={post.id}
              post={post}
              onDelete={() => {
                setPosts((ps) => ps.filter((p) => p.id !== post.id))
              }}
              onUpdate={(newPost) => {
                setPosts((ps) => ps.map((p) => (p.id === post.id ? newPost : p)))
              }}
            />
          ))
        : posts.map((post) => <ShowPost key={post.id} post={post} />)}
      {!hasNext && (
        <button
          className={css.loadMore}
          disabled={isLoadingMore}
          onClick={async () => {
            const before =
              posts.length > 0 ? new Date(posts[posts.length - 1].createdAt) : undefined
            setIsLoadingMore(true)
            const { posts: newPosts, hasNext } = await clientPostService.getPosts({ before })
            setPosts((ps) => ps.concat(newPosts))
            setHasNext(hasNext)
            setIsLoadingMore(false)
          }}
        >
          More
        </button>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { posts, hasNext } = await adminPostService.getPosts()
  return { props: { posts, hasNext } }
}

export default Home
