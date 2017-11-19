import React from 'react';

class EditListingForm extends React.Component {
	editListing(event) {
		event.preventDefault();
		const listing = {
			address: this.address.value,
			city: this.city.value,
			state: this.state.value,
			space: Number(this.space.value),
			bedrooms: Number(this.bedrooms.value),
			price: Number(this.price.value),
			homeType: this.homeType.value,
			image: this.image.value,
			amenities: [],
			id: this.props.globalState.listingId
		}

		if (this.elevator.checked) listing.amenities.push('elevator');
		if (this.gym.checked) listing.amenities.push('gym');
		if (this.basement.checked) listing.amenities.push('basement');
		if (this.pool.checked) listing.amenities.push('pool');

		this.props.editListing(listing);
		this.closeAddForm();
	}

	render() {
		const listingId = this.props.globalState.listingId;
		const listing = this.props.globalState.listingsData.find(listing => {
			return listing.id === listingId;
		});
		const { amenities } = listing.amenities;
		return (
			<div className="popup">
				<div className="form-container">
					<form className="listing-form" onSubmit={(e) => this.editListing(e)}>
						<h1>Edit Listing</h1>
						<input ref={(input) => this.address = input} type="text" name="address" defaultValue={listing.address} required />
						<input ref={(input) => this.city = input} type="text" name="city" defaultValue={listing.city} required />
						<input ref={(input) => this.state = input} type="text" name="state" defaultValue={listing.state} required />
						<input ref={(input) => this.image = input} type="text" name="image" defaultValue={listing.image} required />
						<label htmlFor="bedrooms">Bedrooms</label>
						<input ref={(input) => this.bedrooms = input} type="number" name="bedrooms" defaultValue={listing.bedrooms} required />
						<label htmlFor="price">Price</label>
						<input ref={(input) => this.price = input} type="number" name="price" step="100" defaultValue={listing.price} required />
						<label htmlFor="space">Space</label>	
						<input ref={(input) => this.space = input} type="number" name="space" defaultValue={listing.space} required />
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
							Basement
							<input ref={(input) => this.basement = input} type="checkbox" name="basement" value="basement" />
						</label>
						<button type="submit">Submit</button>
						<button className="closePopup" onClick={this.props.closeEditForm}>Close</button>
					</form>
				</div>
			</div>
		)
	}
}

export default EditListingForm;