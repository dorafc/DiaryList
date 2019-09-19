import React, {Component} from 'react';

import styled from 'styled-components'

import UtilityBar from '../UtilityBar';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import Preferences from '../Preferences';
import ViewEntries from '../ViewEntries';

class SignedIn extends Component{
  constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,      // default color codes
      updateCodes : false,
      prefVisible : false,                // key visibility
      showAll : true                      // show future events or all events
    }
    this.showPref = this.showPref.bind(this)
    this.toggleShowAll = this.toggleShowAll.bind(this)
  }

  showPref(e, isVis){
    e.preventDefault()
		this.setState({
			prefVisible : isVis
		})
  }

  // sets default theme information if nothing has been set
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
    const db = this.props.firebase.db;
    
		// if (this.props.authUser){
      const docRef = db.collection('users').doc(this.props.userId).collection('themes').where('active', '==', true)

			let themes=[]

			docRef.get()
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
        this.setState({
          colorCodes : themes,
          updateCodes : true
        })
      })
			.catch(function(error) {
		  	console.log("Error getting document:", error);
			})
		// }
  }
  
  // toggle showAll for showing future events or not
  toggleShowAll(e){
    if (e){
      e.preventDefault()
    }
    const switchAll = !(this.state.showAll)
    this.setState(
      {showAll : switchAll}
    )
  }

  render() {
    const preferences = (this.state.prefVisible) ? <Preferences showPref={this.showPref} toggleShowAll={this.toggleShowAll} /> : ''

    const entries = (this.state.updateCodes) ? <ViewEntries userId={this.props.userId} showAll={this.state.showAll} /> : ''

    return(
      <Wrapper>
        <ColorCodesContext.Provider value={this.state.colorCodes}>
          <UtilityBar 
            setColor={this.setColorCodes} 
            showPref={this.showPref} 
            authUser={this.props.authUser}
            userId={this.props.userId}
          />
          {preferences}
        </ColorCodesContext.Provider>
        <Content>
          <ColorCodesContext.Provider value={this.state.colorCodes}>
            {entries}
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