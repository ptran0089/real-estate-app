import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div className="popup">
				<div className="popup-container">
					<div className="about">
						<p className="name">Phuong Tran</p>
						<p className="email">Email: ptran0089@gmail.com</p>
						<a href="https://github.com/ptran0089">Github</a>
						<a href="https://codepen.io/ptran0089/">Codepen</a>
						<button onClick={() => this.props.closePopup('About')}>Go back</button>
					</div>
				</div>
			</div>
		);
	}
}

export default About;