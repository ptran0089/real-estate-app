import React from 'react';

class Header extends React.Component {
	renderNavBar() {
		if (this.props.globalState.uid) {
			return (
				<nav>
					<a href="#" onClick={() => this.props.openPopup('AddForm')}>CREATE LISTING</a>
					{this.props.globalState.uid === 'ptran0089@gmail.com' ? 
						<a href="#" onClick={this.props.loadSampleListings}>LOAD SAMPLE LISTINGS</a> : null
					}
					<a>{this.props.globalState.uid.toUpperCase()}</a>
					<a href="#" onClick={this.props.handleSignOut}>SIGN OUT</a>
				</nav>
			);
		} else {
			return (
				<nav>
					<a href="#" onClick={() => this.props.openPopup('AddForm')}>CREATE LISTING</a>
					<a href="#" onClick={() => this.props.openPopup('SignInForm')}>SIGN IN</a>
					<a href="#" onClick={() => this.props.openPopup('RegisterForm')}>REGISTER</a>
				</nav>
			);
		}
	}

	render() {
		return (
			<div id="header">
				<div id="logo">Logo</div>
				{this.renderNavBar()}
			</div>
		)
	}
}

export default Header;