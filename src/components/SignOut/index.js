import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class SignOutButton extends Component {
  signOutClick = event => {
    this.props.firebase.doSignOut()
    event.preventDefault();
  };

  render(){
    return(
      <a href="#signout" onClick={this.signOutClick}>
        Sign Out
      </a>
    )
  }
}

// firebase.doSignOut

export default (withFirebase(SignOutButton));