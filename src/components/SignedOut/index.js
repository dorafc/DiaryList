import React, {Component} from 'react';

import styled, { keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

import UtilityBar from '../UtilityBar';

// <SignedOut> : Display content for signed out user
class SignedOut extends Component{

  // allow user to sign in
  onClick = event => {
    this.props.firebase.doSignInWithRedirect()
  }

  // TODO: Update login text
  render() {
    return(
      <Wrapper>
        <UtilityBar 
          setColor={null} 
          setKey={false} 
          authUser={null}
        />
        <Content>
          <WelcomeText>
            <Title>How was your day?</Title>
            <h4>Welcome to Lifey McLifeface</h4>
            <ul>
              <li>I am a friendly App</li>
              <li>Made at RC</li>
              <li>React + Firebase === TECHNOLOGY</li>
              <li>Won't judge you, unlike to-do lists</li>
              <li>Reflect on your day</li>
              <li>Made by me, Dora!</li>
              <li>Need to make a demo account</li>
              <li>Real accounts for friends, also I can see ur data</li>
            </ul>
          </WelcomeText>
          
          <BtnWrapper>
            <SignInBtn onClick={this.onClick}>
              Sign In
            </SignInBtn>
          </BtnWrapper>
          
        </Content>
      </Wrapper>
    )
  }
}

// styled components
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const SignInBtn = styled.button`
  border-radius: 10px;
	border: solid 3px ${styles.green};
	background-color: transparent;
	color: ${styles.green};
	padding: 20px 100px;
	font-size: 19px;
  margin: 60px 0;
	transition: all .3s ease-in-out;

	:hover{
		border-radius: 0;
		box-shadow: 4px 4px ${styles.lightGreen};
	}

	:active{
		box-shadow: none;
		box-shadow: -4px -4px ${styles.lightGreen};
		outline: none;
		transform: translate(4px, 4px);
	}

	:focus{
		outline: none;
	}

  @media (max-width: 450px) {
    padding: 20px 60px;
  }
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
  @media (max-width: 650px){
    padding: 75px 17px 0;
  }
`
const WelcomeText = styled.div`
  position: relative;
  border: solid 3px ${styles.green};
  padding: 10px 20px;
  *{
    color: ${styles.green}
  }
`
const Title = styled.h3`
  background: linear-gradient(90deg, #fceae8, #ffebeb, #fff9e8, #ffffeb, #edfff0, #e8feff, #eeedff, #fdedff, #fdebff);
  background-size: 1800% 1800%;
  animation: ${rainbowKeyframes} 30s ease infinite;
  color: ${styles.green};
  margin: 0;
  padding: 0 10px;
  position: absolute;
  top: -10px
`
export default SignedOut;