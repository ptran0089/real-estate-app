import React from 'react';

class SignInForm extends React.Component {
	handleSubmit(event) {
		event.preventDefault();
		const email = this.email.value;
		const password = this.password.value;
		this.props.handleSignIn(email, password);
	}

	render() {
		return (
			<div className="popup">
				<div className="form-container">
					<form className="listing-form" onSubmit={(e) => this.handleSubmit(e)}>
						<h1>Sign In</h1>
						<label htmlFor="email">Email</label>
						<input ref={(input) => this.email = input} type="text" name="email" required />
						<label htmlFor="password">Password</label>
						<input ref={(input) => this.password = input} type="text" name="password" required />
						<button type="submit">Sign In</button>
						<button className="closePopup" onClick={() => this.props.closePopup('SignInForm')}>Close</button>
					</form>
				</div>
			</div>
		)
	}
}

export default SignInForm;