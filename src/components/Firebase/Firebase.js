import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// env variables with firebase auth
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
}

// <Firebase>: Initialize app once, set needed methods
// TODO: ensure that all firebase methods go through here
class Firebase {
  constructor() {
    app.initializeApp(config);

    // Firestore Database
    this.db = app.firestore();

    this.db.enablePersistence()
    .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
    });
    // Subsequent queries will use persistence, if it was enabled successfully

    // authentication
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider()
  }

  // *** Auth API ***
  doSignOut = () => {
    this.auth.signOut();
  }

  // *** Sign In ***
  doSignInWithRedirect = () => {
    this.auth.signInWithRedirect(this.provider)
  }

  // *** Helper Classes ***
  getTimestamp = () => {
    return app.firestore.Timestamp.fromDate(new Date())
  }
}

export default Firebase;