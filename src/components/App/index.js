import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import SignedOut from '../SignedOut';
import SignedIn from '../SignedIn';
import { withFirebase } from '../Firebase';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      authUser: null
    }
  }
  
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){
    const content = (this.state.authUser !== null) ? <SignedInData userId={this.state.authUser.uid} authUser={this.state.authUser} /> : <SignedOutData />
  	return (
      <Router>
        {content}
      </Router>
      
  	)
  }
}
// components with data
const SignedOutData = withFirebase(SignedOut)
const SignedInData = withFirebase(SignedIn)

export default withFirebase(App);