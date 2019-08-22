import React, {Component} from 'react';
import Close from '../Close';
import ShowKey from '../ShowKey';

import styled, { css, keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

class Preferences extends Component{
   render(){
     return(
      <PreferenceMenuContainer>
        <PreferenceMenu className="preferenceMenu">
          <Close closeThis={this.props.showPref} />
          <FormGreeting>Preferences</FormGreeting>
          <div className="preferenceContent">
            <div className="colorGuide">
              <p>Guide to Colors</p>
              <ShowKey />
            </div>
          </div>
        </PreferenceMenu>
      </PreferenceMenuContainer>
     )
   }
}

// styles

const fadeColor =  keyframes` 
  0%{opacity: 0;}
  100%{opacity: 1;}
`
const lowerForm = keyframes`
	0%{top: -15%}
	100%{top: 0}
`
const FormGreeting = styled.h3`
	color: ${styles.green};
`

const PreferenceMenuContainer = styled.div`
	background-color: rgba(0,0,0,.7);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 5;
	animation: ${fadeColor} .3s ease;
`

const PreferenceMenu = styled.form`
	background-color: ${styles.pale};
	position: fixed;
	top: 0;
	width: 100%;
	padding: 20px 60px;
	animation: ${lowerForm} .35s ease-in;
	color: ${styles.green};

	.close{
		float: right;
	}
`

export default Preferences;