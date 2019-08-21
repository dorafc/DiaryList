import React, {Component} from 'react';

import styled, { keyframes } from 'styled-components'

import UtilityBar from '../UtilityBar';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import ShowKey from '../ShowKey';
import ViewEntries from '../ViewEntries';
import { ENGINE_METHOD_RAND } from 'constants';

class SignedIn extends Component{
  constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,      // default color codes
      keyVisible : false,                 // key visitbility
    }
    this.showKey = this.showKey.bind(this)
  }

  showKey(e, isVis){
    e.preventDefault()
		this.setState({
			keyVisible : isVis
		})
  }

  getDefaultThemes(){
    const db = this.props.firebase.db;
    const defaultTheme = db.collection('defaultTheme')
    const user = db.collection('users').doc(this.props.userId)

    defaultTheme.get()
    .then((themes) => {
      console.log('set theme')
      themes.forEach((theme) => {
        console.log(theme.data())
        user.collection('themes').doc().set(theme.data())
      })
    })
    .catch(function(error) {
      console.log("Error getting default themes:", error);
    })
  }

  componentDidMount(){
		const db = this.props.firebase.db;
		if (this.props.authUser){
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
          colorCodes : themes
        })
      })
			.catch(function(error) {
		  	console.log("Error getting document:", error);
			})
		}
	}

  render() {
    const key = (this.state.keyVisible) ? <Key><ShowKey setKey={this.showKey} /></Key> : ''

    return(
      <Wrapper>
        <ColorCodesContext.Provider value={this.state.colorCodes}>
          <UtilityBar 
            setColor={this.setColorCodes} 
            setKey={this.showKey} 
            authUser={this.props.authUser}
            userId={this.props.userId}
          />
          {key}
        </ColorCodesContext.Provider>
        <Content>
          <ColorCodesContext.Provider value={this.state.colorCodes}>
            <ViewEntries userId={this.props.userId} />
          </ColorCodesContext.Provider>
        </Content>
      </Wrapper>
    )
  }
}

// styled components
const Key = styled.div`
  position: fixed;
  width: 30%;
  right: 0;
  top: 46px;
`

const rainbowKeyframes =  keyframes` 
  0%{background-position:0% 82%}
  50%{background-position:100% 19%}
  100%{background-position:0% 82%}
`

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
`

const Content = styled.div`
  padding: 75px 20px 0;
  min-height: 100vh;
  background: linear-gradient(90deg, #fceae8, #ffebeb, #fff9e8, #ffffeb, #edfff0, #e8feff, #eeedff, #fdedff, #fdebff);
  background-size: 1800% 1800%;
  animation: ${rainbowKeyframes} 30s ease infinite;
`

export default SignedIn;