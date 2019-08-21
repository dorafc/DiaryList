import React, {Component} from 'react';

import styled, { keyframes } from 'styled-components'

import UtilityBar from '../UtilityBar';

function onClick(event) {
  this.props.firebase.doSignInWithRedirect()
}

class SignedOut extends Component{
  onClick = event => {
    this.props.firebase.doSignInWithRedirect()
  }

  render() {
    return(
      <Wrapper>
        <UtilityBar 
          setColor={null} 
          setKey={false} 
          authUser={null}
        />
        <Content>
          <p>LOGIN HEREEEEE! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <button onClick={this.onClick}>
            Sign In
          </button>
        </Content>
      </Wrapper>
    )
  }
}

// styled components
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

export default SignedOut;