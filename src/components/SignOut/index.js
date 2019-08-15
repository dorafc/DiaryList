import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class SignOutButton extends Component {
  signOutClick = event => {
    this.props.firebase.doSignOut()
    this.props.history.push(ROUTES.LANDING);
    event.preventDefault();
  };

  render(){
    return(
      <button type="button" onClick={this.signOutClick}>
        Sign Out
      </button>
    )
  }
}

// firebase.doSignOut

export default withRouter(withFirebase(SignOutButton));