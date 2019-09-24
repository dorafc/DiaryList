import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import styled from 'styled-components'

import SignedOut from '../SignedOut';
import Spinny from '../Spinny';
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

    let content;

    if (this.state.loading === true){
      content = <Wrapper><Spinny /></Wrapper>
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