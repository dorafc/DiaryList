import React, {Component} from 'react';
import Close from '../Close';
import ShowKey from '../ShowKey';
import ShowFuture from '../ShowFuture';

import styled, { css, keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

class Preferences extends Component{
   render(){
     return(
      <PreferenceMenuContainer>
        <PreferenceMenu className="preferenceMenu">
          <Close closeThis={this.props.showPref} />
          <PreferenceContent>
            <ColorGuide>
              <PrefTitle>Guide to Colors</PrefTitle>
              <ShowKey />
            </ColorGuide>
            <PrefGuide>
              <PrefTitle>Preferences</PrefTitle>
              <ShowFuture toggleShowAll={this.props.toggleShowAll} btnText={this.props.btnText}/>
            </PrefGuide>
          </PreferenceContent>
        </PreferenceMenu>
      </PreferenceMenuContainer>
     )
   }
}

// styles
const PreferenceContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const ColorGuide = styled.div`
  border: solid 2px ${styles.green};
  padding: 10px;
  position: relative;
  flex-basis: 46%;
  @media (max-width: 575px){
    flex-basis: 100%;
    margin-bottom: 30px;
  }
`
const PrefGuide = styled.div`
  border: solid 2px ${styles.green};
  padding: 10px;
  position: relative;
  flex-basis: 46%;
  @media (max-width: 575px){
    flex-basis: 100%;
  }
`
const PrefTitle = styled.h3`
  background-color: ${styles.pale};
  margin: 0;
  padding: 0 10px;
  position: absolute;
  top: -10px
`

const fadeColor =  keyframes` 
  0%{opacity: 0;}
  100%{opacity: 1;}
`
const lowerForm = keyframes`
	0%{top: -15%}
	100%{top: 0}
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

  @media (max-width: 575px){
    padding: 20px
  }
`

export default Preferences;