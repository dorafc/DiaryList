import React, {Component} from 'react';

import styled from 'styled-components'

import UtilityBar from '../UtilityBar';
import {ColorCodesContext} from '../KeyTheme';
import Preferences from '../Preferences';
import ViewEntries from '../ViewEntries';

// <SignedIn> : component containing content for signed in users
class SignedIn extends Component{
  constructor(props) {
		super(props);
    this.state = {
      colorCodes : [],                    // color codes for the user
      updateCodes : false,                // color codes have been set
      prefVisible : false,                // preferences visibility
      showAll : true                      // show future events or all events
    }
  }

  // *** show preferences component as function to pass into child compoents 
  showPref = (e, isVis) => {
    e.preventDefault()
		this.setState({
			prefVisible : isVis
		})
  }

  // *** toggle showAll for showing future events or not as function to pass into child compoents
  toggleShowAll = (e) => {
    if (e){
      e.preventDefault()
    }
    const switchAll = !(this.state.showAll)
    this.setState(
      {showAll : switchAll}
    )
  }

  // *** sets default theme information if nothing has been by the user
  getDefaultThemes(){
    const db = this.props.firebase.db;
    const defaultTheme = db.collection('defaultTheme')
    const user = db.collection('users').doc(this.props.userId)

    defaultTheme.get()
    .then((themes) => {
      themes.forEach((theme) => {
        user.collection('themes').doc().set(theme.data())
      })
    })
    .catch(function(error) {
      console.log("Error getting default themes:", error);
    })
  }

  componentDidMount(){
    const db = this.props.firebase.db;      // instance of Firebase DB
    const themeRef = db.collection('users').doc(this.props.userId).collection('themes').where('active', '==', true) // get active themes for the signed in user
    let themes=[]                           // store array of themes

    themeRef.get()
    .then((entry) => {
      if (entry.size === 0){
        // check if themes have been set
        this.getDefaultThemes()
      } else {
        // themes have been set
        entry.forEach(function(doc) {
          themes.push(doc.data())
        });
      }
    })
    .then(() => {
      // update color codes in state
      this.setState({
        colorCodes : themes,
        updateCodes : true
      })
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    })
  }

  render() {
    return(
      <Wrapper>
        <ColorCodesContext.Provider value={this.state.colorCodes}>
          <UtilityBar 
            setColor={this.setColorCodes} 
            showPref={this.showPref} 
            authUser={this.props.authUser}
            userId={this.props.userId}
          />
          {this.state.prefVisible && 
            <Preferences showPref={this.showPref} toggleShowAll={this.toggleShowAll} />
          }
        </ColorCodesContext.Provider>
        <Content>
          <ColorCodesContext.Provider value={this.state.colorCodes}>
            {this.state.updateCodes && 
              <ViewEntries userId={this.props.userId} showAll={this.state.showAll} />
            }
          </ColorCodesContext.Provider>
        </Content>
      </Wrapper>
    )
  }
}

// styled components
const Wrapper = styled.div`
  padding: 0;
  margin: 0;
`

const Content = styled.div`
  padding: 75px 30px 0;
  min-height: 100vh;
  @media (max-width: 650px){
    padding: 75px 17px 0;
  }
`

export default SignedIn;