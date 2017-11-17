import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<div id="header">
				<div id="logo">Logo</div>
				<nav>
					<a href="#">HOME</a>
					<a href="#" onClick={this.props.openAddForm}>CREATE LISTING</a>
					<a href="#">ABOUT US</a>
					<a href="#">LOGIN</a>
					<a href="#">REGISTER</a>
				</nav>
			</div>
		)
	}
}

export default Header;