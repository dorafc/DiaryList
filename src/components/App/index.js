import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import styled from 'styled-components'

import SignedOut from '../SignedOut';
import Spinny from '../Spinny';
import SignedIn from '../SignedIn';
import { withFirebase } from '../Firebase';

// <App> : Component containing major content for the app

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      authUser: null,   // user is logged in or not
      loading: true     // page is loading or not loading
    }
  }
  
  componentDidMount() {
    // set state based on the authentication status set by firebase
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      user => {user
        ? this.setState({ authUser: user, loading: false })
        : this.setState({ authUser: null, loading: false });
    });
  }

  componentWillUnmount() {
    // avoid performance issues when the component unmounts
    this.listener();
  }

  render(){
    let content;        // variable stores content for the page depanding on component state

    if (this.state.loading === true){
      // page is loading, show loading screen
      content = <Wrapper><Spinny /></Wrapper>
    } else {

      // user has either signed in, or not signed in
      if (this.state.authUser !== null){
        content = <SignedInData userId={this.state.authUser.uid} authUser={this.state.authUser} />
      } else {
        content = <SignedOutData />
      }
    }
  	return (
      // TODO: rethink need for React Router
      <Router>
        {content}
      </Router>
  	)
  }
}

// styled components
const Wrapper = styled.div`
  margin: 0;
  padding: 75px 30px 0;
  min-height: 100vh;
  @media (max-width: 650px){
    padding: 75px 17px 0;
  }
`

// components with data
const SignedOutData = withFirebase(SignedOut)
const SignedInData = withFirebase(SignedIn)

export default withFirebase(App);