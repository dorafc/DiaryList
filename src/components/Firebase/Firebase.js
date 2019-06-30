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

    // this.db.collection("users").add({
    //   first: "Tom",
    //   last: "Caswell",
    //   code: "Python"
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

    // this.db.collection("users").add({
    //   first: "Dora",
    //   last: "Caswell",
    //   code: "CSS"
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

    this.db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().code}`);
        });
    });

  }
}

export default Firebase;