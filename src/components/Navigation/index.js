import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser, setKey }) => (
  <div>{authUser ? <NavigationAuth setKey={setKey}/> : <NavigationNonAuth />}</div>
);

function NavigationAuth(props){
	return(
		<Nav>
			<NavList>
				<NavListItem>
	        <Link to={ROUTES.LANDING}>Landing</Link>
	      </NavListItem>
        <NavListItem>
          <SignOutButton />
        </NavListItem>
				<NavListItem>
					<a href="#showKey" onClick={(e)=>props.setKey(e,true)}>Key</a>
				</NavListItem>
	    </NavList>
		</Nav>
	)
}


function NavigationNonAuth(){
	return(
		<Nav>
			<NavList>
	      <NavListItem>
	        <Link to={ROUTES.SIGNIN}>Sign In</Link>
	      </NavListItem>
        <NavListItem>
	        <Link to={ROUTES.SIGNUP}>Sign Up</Link>
	      </NavListItem>
	    </NavList>
		</Nav>
	)
}

// styles
const Nav = styled.nav`
	height: 0;
`

const NavList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: middle;
	position: relative;
	top: 4px;
`

const NavListItem = styled.li`
	text-transform: uppercase;
	font-size: 12px;
	letter-spacing: 1px;
	padding-left: 10px;
	line-height: 1em;

	a {
		color: white;
		text-decoration: none;
	}

	a:hover{
		${'' /* color: rgba(255,255,255,.8); */}
	}

	a::after{
		display: block;
		content: '';
		background-color: rgba(255,255,255,.6);
		height: 2px;
		width: 0%;
    transition:width .5s ease-out;
	}

	a:hover::after{
		width: 100%;
	}
`

export default Navigation;