import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import ViewEntries from '../ViewEntries';
import Landing from '../Landing';
import SignIn from '../SignIn';
import { withFirebase } from '../Firebase';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import ShowKey from '../ShowKey';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,
      keyVisible : false,
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

  render(){
    const key = (this.state.keyVisible) ? <Key><ShowKey setKey={this.showKey} /></Key> : ''

  	return (
      <Router>
    		<AppWrap>

    			<ColorCodesContext.Provider value={this.state.colorCodes}>
  			  	<UtilityBarData setColor={this.setColorCodes} setKey={this.showKey} />
            {key}
  		  	</ColorCodesContext.Provider>

          <Content>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGNIN} component={SignIn} />
            <ColorCodesContext.Provider value={this.state.colorCodes}>
              <Route path={ROUTES.HOME} component={ViewEntries}/>
            </ColorCodesContext.Provider>
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

const Content = styled.div`
  padding: 75px 20px 0 20px;
  min-height: 100vh;
  background-color: ${styles.pale};
`

export default App;