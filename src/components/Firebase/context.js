import React from 'react';

const FirebaseContext = React.createContext(null);

// export higher order function that wraps component parameter in a consumer with the single firebase instance
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;