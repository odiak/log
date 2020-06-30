import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (typeof window !== 'undefined') {
  firebase.initializeApp({
    apiKey: 'AIzaSyB7UippqLHK5tU5-HuEbiTum-VzM9qAUeQ',
    authDomain: 'odiak-log.firebaseapp.com',
    databaseURL: 'https://odiak-log.firebaseio.com',
    projectId: 'odiak-log',
    storageBucket: 'odiak-log.appspot.com',
    messagingSenderId: '74156058530',
    appId: '1:74156058530:web:ab0f3c91db49972270b4fb',
    measurementId: 'G-L59SB2ZCK2'
  })
}

export default {}
