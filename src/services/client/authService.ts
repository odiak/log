import firebase from 'firebase/app'
import '../../firebase-config'

export const authService = {
  onAuthStateChanged(callback: (result: { signedIn: boolean }) => void): () => void {
    return firebase.auth().onAuthStateChanged((u) => {
      callback({ signedIn: u != null })
    })
  },

  async signIn(): Promise<void> {
    await firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
}
