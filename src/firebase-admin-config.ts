import admin from 'firebase-admin'

if (typeof window === 'undefined') {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      projectId: 'odiak-log',
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    })
  }
}

export default {}
