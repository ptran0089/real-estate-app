import React from 'react';

class Header extends React.Component {
	renderNavBar() {
		const { globalState, loadSampleListings, handleSignOut, openPopup } = this.props;
		if (globalState.uid) {
			return (
				<nav>
					<a href="#" onClick={() => openPopup('About')}>ABOUT</a>
					<a href="#" onClick={() => openPopup('AddForm')}>CREATE LISTING</a>
					{globalState.userEmail === 'ptran0089@gmail.com' ? 
						<a href="#" onClick={loadSampleListings}>LOAD SAMPLE LISTINGS</a> : null
					}
					<a>SIGNED IN AS {globalState.username || globalState.userEmail.toUpperCase()}</a>
					<a href="#" onClick={handleSignOut}>SIGN OUT</a>
				</nav>
			);
		} else {
			return (
				<nav>
					<a href="#" onClick={() => openPopup('About')}>ABOUT</a>
					<a href="#" onClick={() => openPopup('AddForm')}>CREATE LISTING</a>
					<a href="#" onClick={() => openPopup('SignInForm')}>SIGN IN</a>
					<a href="#" onClick={() => openPopup('RegisterForm')}>REGISTER</a>
				</nav>
			);
		}
	}

	render() {
		const { menu } = this.props.globalState;
		return (
			<div id="header" className={menu ? "open" : ""}>
				<div id="logo">Logo</div>
				{this.renderNavBar()}
			</div>
		)
	}
}

export default Header;