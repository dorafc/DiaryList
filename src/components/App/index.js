import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled, { keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import ViewEntries from '../ViewEntries';
import Landing from '../Landing';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { withFirebase } from '../Firebase';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import ShowKey from '../ShowKey';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,      // default color codes
      keyVisible : false,                 // key visitbility
      authUser: null,                     // current auth state
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
    const key = (this.state.keyVisible) ? <Key><ShowKey setKey={this.showKey} /></Key> : ''
    const userID = (this.state.authUser !== null) ? this.state.authUser.uid : null
    let pathHome;
    let utilComp;
    if (this.state.authUser !== null){
      pathHome = <ColorCodesContext.Provider value={this.state.colorCodes}>
                    <Route path={ROUTES.HOME} render={(props) => <ViewEntries userId={userID} />}/>
                  </ColorCodesContext.Provider>
      utilComp = <ColorCodesContext.Provider value={this.state.colorCodes}>
                  <UtilityBarData 
                    setColor={this.setColorCodes} 
                    setKey={this.showKey} 
                    authUser={this.state.authUser}
                    userId={userID}
                  />
                  {key}
                </ColorCodesContext.Provider>
    } else {
      pathHome = ''
      utilComp = ''
    }
  	return (
      <Router>
    		<AppWrap>
    			{utilComp}
          <Content>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGNIN} component={SignIn} />
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            {pathHome}
          </Content>

  		  </AppWrap>
      </Router>
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

const AppWrap = styled.div`
  ${'' /* background-color: pink; */}
`
const rainbowKeyframes =  keyframes` 
  0%{background-position:0% 82%}
  50%{background-position:100% 19%}
  100%{background-position:0% 82%}
`

const Content = styled.div`
  padding: 75px 20px 0 20px;
  min-height: 100vh;
  ${'' /* background-color: ${styles.pale}; */}
  background: linear-gradient(90deg, #fceae8, #ffebeb, #fff9e8, #ffffeb, #edfff0, #e8feff, #eeedff, #fdedff, #fdebff);
  background-size: 1800% 1800%;
  animation: ${rainbowKeyframes} 30s ease infinite;

`

export default withFirebase(App);