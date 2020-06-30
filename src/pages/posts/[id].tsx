import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { postService } from '../../services/admin/postService'
import { Post } from '../../services/common/Post'
import { ShowPost } from '../../components/ShowPost'

const SinglePost: FC<{ post: Post }> = ({ post }) => {
  return <ShowPost post={post} />
}

export const getServerSideProps: GetServerSideProps<{ post: Post }, { id: string }> = async ({
  params
}) => {
  const post = await postService.getPost(params!.id)
  return { props: { post } }
}

export default SinglePost
