import React from 'react';

class RegisterForm extends React.Component {
	handleSubmit(event) {
		event.preventDefault();
		const username = this.username.value;
		const password = this.password.value;
		console.log('Registering');
		console.log(username, password);
		this.props.handleRegistration(username, password);
	}

	render() {
		return (
			<div className="popup">
				<div className="form-container">
					<form className="listing-form" onSubmit={(e) => this.handleSubmit(e)}>
						<h1>Register</h1>
						<label htmlFor="username">Username</label>
						<input ref={(input) => this.username = input} type="text" name="username" required />
						<label htmlFor="password">Password</label>
						<input ref={(input) => this.password = input} type="text" name="password" required />
						<button type="submit">Register</button>
						<button className="closePopup" onClick={() => this.props.closePopup('RegisterForm')}>Close</button>
					</form>
				</div>
			</div>
		)
	}
}

export default RegisterForm;