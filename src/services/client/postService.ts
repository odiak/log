import firebase from 'firebase/app'
import '../../firebase-config'
import { Post, decodePost } from '../common/Post'

export const postService = {
  async createPost({ body }: { body: string }): Promise<Post> {
    const r = await firebase
      .firestore()
      .collection('posts')
      .add({ body, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
    return decodePost(await r.get())
  },

  async getPosts({ before }: { before?: Date } = {}): Promise<{
    posts: Array<Post>
    hasNext: boolean
  }> {
    const limit = 100
    let q = firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(limit + 1)
    if (before != null) {
      q = q.startAfter(firebase.firestore.Timestamp.fromDate(before))
    }
    const qs = await q.get()
    const posts = (qs.docs as any[]).map((d) => decodePost(d))
    return { posts: posts.slice(0, limit), hasNext: posts.length <= limit }
  },

  async deletePost(id: string): Promise<void> {
    await firebase.firestore().collection('posts').doc(id).delete()
  },

  async updatePost(id: string, update: { body: string }): Promise<Post> {
    const ref = firebase.firestore().collection('posts').doc(id)
    await ref.update(update)
    return decodePost(await ref.get())
  }
}
