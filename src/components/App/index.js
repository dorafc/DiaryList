import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import SignedOut from '../SignedOut';
import SignedIn from '../SignedIn';
import { withFirebase } from '../Firebase';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      authUser: null,
      loading: true
    }
  }
  
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser, loading: false })
        : this.setState({ authUser: null, loading: false });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){
    // const content = (this.state.authUser !== null) ? <SignedInData userId={this.state.authUser.uid} authUser={this.state.authUser} /> : <SignedOutData />

    let content;

    if (this.state.loading === true){
      content = <Spinny />
    } else {
      if (this.state.authUser !== null){
        content = <SignedInData userId={this.state.authUser.uid} authUser={this.state.authUser} />
      } else {
        content = <SignedOutData />
      }
    }
  	return (
      <Router>
        {content}
      </Router>
      
  	)
  }
}

function Spinny(props){
  return <h1>SPINNING WHEEL OF WAITING</h1>
}

// components with data
const SignedOutData = withFirebase(SignedOut)
const SignedInData = withFirebase(SignedIn)

export default withFirebase(App);