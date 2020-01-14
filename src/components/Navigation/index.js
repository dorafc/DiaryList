import React from 'react';

import SignOutButton from '../SignOut';
import styled from 'styled-components'

// <Navigation>: navigation bar content for logged in an logged out users
// note: this is an example of a component created by a funtion expression, not a function declaration
const Navigation = ({ authUser, showPref }) => (
  <>{authUser ? <NavigationAuth showPref={showPref}/> : <NavigationNonAuth />}</>
);

// <NavigationAuth>: Nav bar for authenticated users
function NavigationAuth(props){
	return(
		<Nav>
			<NavList>
        <NavListItem>
          <SignOutButton />
        </NavListItem>
				<IconListItem>
					<a href="#showPref" onClick={(e)=>props.showPref(e,true)} className="material-icons setting">settings</a>
				</IconListItem>
	    </NavList>
		</Nav>
	)
}

// <NavigationNonAuth>: Navigation bar non authenticated users
function NavigationNonAuth(){
	return(
		<Nav>
			<NavList>
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
`
const IconListItem = styled.li`
	font-size: 12px;
	padding-left: 10px;
	line-height: 1em;
	position: relative;
	top: -6px;
	a {
		transition: transform .4s ease-in-out;
		color: white;
		text-decoration: none;
	}
	a:hover{
		transform: rotate(180deg);
	}
`

export default Navigation;