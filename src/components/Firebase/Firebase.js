import app from 'firebase/app';
import 'firebase/firestore';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    // Firestore Database
    this.db = app.firestore();

    // temporary testing to add a user document
    this.db.collection("users").doc('dcaswell').set({
      first: "Dora",
      last: "Caswell",
    }, { merge: true })
    .then(function() {
        console.log("Document written with ID: ");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}

export default Firebase;