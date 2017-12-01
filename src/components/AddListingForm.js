import React from 'react';

class AddListingForm extends React.Component {
	createListing(event) {
		const id = `listing${Date.now()}`;
		event.preventDefault();
		const listing = {
			address: this.address.value,
			city: this.city.value,
			state: this.state.value,
			bedrooms: Number(this.bedrooms.value),
			price: Number(this.price.value),
			space: Number(this.space.value),
			homeType: this.homeType.value,
			image: this.image.value,
			amenities: [],
			id,
			owner: this.props.globalState.userEmail
		};

		if (this.elevator.checked) listing.amenities.push('elevator');
		if (this.gym.checked) listing.amenities.push('gym');
		if (this.jacuzzi.checked) listing.amenities.push('jacuzzi');
		if (this.pool.checked) listing.amenities.push('pool');

		this.props.addListing(listing);
	}

	renderAddListingForm() {
		if (!this.props.globalState.uid) {
			return (
				<form className="listing-form">
					<div>Please sign in to create a listing</div>
					<button className="closePopup" onClick={() => this.props.closePopup('AddForm')}>Close</button>
				</form>
			);
		} else {
			return (
				<form className="listing-form" onSubmit={(e) => this.createListing(e)}>
					<h1>Create a New Listing</h1>
					<input ref={(input) => this.address = input} type="text" name="address" placeholder="Address" required />
					<input ref={(input) => this.city = input} type="text" name="city" placeholder="City" required />
					<input ref={(input) => this.state = input} type="text" name="state" placeholder="State" required />
					<input ref={(input) => this.image = input} type="text" name="image" placeholder="Image URL" required />
					<label htmlFor="bedrooms">Bedrooms</label>
					<input ref={(input) => this.bedrooms = input} type="number" name="bedrooms" defaultValue="1" required />
					<label htmlFor="price">Price</label>
					<input ref={(input) => this.price = input} type="number" name="price" step="100" defaultValue="1000" required />
					<label htmlFor="space">Space</label>	
					<input ref={(input) => this.space = input} type="number" name="space" defaultValue="500" required />
					<label>
						Type
						<select ref={(input) => this.homeType = input} name="homeType">
							<option value="Apartment">Apartment</option>
							<option value="Condo">Condo</option>
							<option value="House">House</option>
							<option value="Room">Room</option>
						</select>
					</label>
					<h2>Amenities</h2>
					<label>
						Elevator
						<input ref={(input) => this.elevator = input} type="checkbox" name="elevator" value="elevator" />
					</label>
					<label>
						Gym
						<input ref={(input) => this.gym = input} type="checkbox" name="gym" value="gym" />
					</label>
					<label>
						Pool
						<input ref={(input) => this.pool = input} type="checkbox" name="pool" value="pool" />
					</label>
					<label>
						Jacuzzi
						<input ref={(input) => this.jacuzzi = input} type="checkbox" name="jacuzzi" value="jacuzzi" />
					</label>
					<button type="submit">Submit</button>
					<button className="closePopup" onClick={() => this.props.closePopup('AddForm')}>Close</button>
				</form>
			);
		}
	}

	render() {
		return (
			<div className="popup">
				<div className="form-container">
					{this.renderAddListingForm()}
				</div>
			</div>
		)
	}
}

export default AddListingForm;