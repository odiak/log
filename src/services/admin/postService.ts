import admin from 'firebase-admin'
import '../../firebase-admin-config'
import { Post, decodePost } from '../common/Post'

const firestore = admin.firestore()

export const postService = {
  async getPosts({ before }: { before?: Date } = {}): Promise<{
    posts: Array<Post>
    hasNext: boolean
  }> {
    const limit = 100
    let q = firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(limit + 1)
    if (before != null) {
      q = q.startAfter(admin.firestore.Timestamp.fromDate(before))
    }
    const qs = await q.get()
    const posts = (qs.docs as any[]).map((d) => decodePost(d))
    return { posts: posts.slice(0, limit), hasNext: posts.length <= limit }
  },

  async getPost(id: string): Promise<Post> {
    return decodePost(await firestore.collection('posts').doc(id).get())
  }
}
