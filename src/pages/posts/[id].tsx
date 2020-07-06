import { FC, useState } from 'react'
import { GetServerSideProps } from 'next'
import { postService } from '../../services/admin/postService'
import { Post } from '../../services/common/Post'
import { ShowPost, ShowPostEditable } from '../../components/ShowPost'
import { useIsAuthenticated } from '../../utils/useIsAuthenticated'
import { Title } from '../../components/Title'

const SinglePost: FC<{ post: Post }> = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost)

  const isAuthenticated = useIsAuthenticated()

  return (
    <>
      <Title>{makeTitle(post)}</Title>
      {isAuthenticated ? (
        <ShowPostEditable post={post} onUpdate={setPost} />
      ) : (
        <ShowPost post={post} />
      )}
    </>
  )
}

function makeTitle(post: Post): string {
  return post.body.trim().split('\n', 2)[0].replace(/#+/, '').trim()
}

export const getServerSideProps: GetServerSideProps<{ post: Post }, { id: string }> = async ({
  params
}) => {
  const post = await postService.getPost(params!.id)
  return { props: { post } }
}

export default SinglePost
