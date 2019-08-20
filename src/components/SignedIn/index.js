import React, {Component} from 'react';

import styled, { keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';
import { withFirebase } from '../Firebase';

import UtilityBar from '../UtilityBar';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import ShowKey from '../ShowKey';
import ViewEntries from '../ViewEntries';

class SignedIn extends Component{
  constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,      // default color codes
      keyVisible : false,                 // key visitbility
    }
    this.setColorCodes = this.setColorCodes.bind(this)
    this.showKey = this.showKey.bind(this)
  }

  setColorCodes(color) {
    this.setState({
      colorCodes : color
    })
  }

  showKey(e, isVis){
    e.preventDefault()
		this.setState({
			keyVisible : isVis
		})
  }

  render() {
    const key = (this.state.keyVisible) ? <Key><ShowKey setKey={this.showKey} /></Key> : ''

    return(
      <Wrapper>
        <ColorCodesContext.Provider value={this.state.colorCodes}>
          <UtilityBarData 
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

// components with data
const UtilityBarData = withFirebase(UtilityBar)

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
  ${'' /* background-color: ${styles.pale}; */}
  background: linear-gradient(90deg, #fceae8, #ffebeb, #fff9e8, #ffffeb, #edfff0, #e8feff, #eeedff, #fdedff, #fdebff);
  background-size: 1800% 1800%;
  animation: ${rainbowKeyframes} 30s ease infinite;
`

export default SignedIn;