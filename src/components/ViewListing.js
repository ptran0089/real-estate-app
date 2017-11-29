import React from 'react';

class ViewListing extends React.Component {
	displayAmenities() {
		const listingId = this.props.globalState.listingId;
		const listing = this.props.globalState.listingsData.find(listing => {
			return listing.id === listingId;
		});

		if (listing.amenities && listing.amenities.length > 0) {
			return listing.amenities.map((amenity, index) => {
				if(amenity === 'elevator') {
					return <div key={listingId + index}>🔼 Elevator</div>
				}
				else if(amenity === 'gym') {
					return <div key={listingId + index}>🏃 Gym</div>
				}
				else if(amenity === 'pool') {
					return <div key={listingId + index}>🏊 Pool</div>
				}
				else if(amenity === 'jacuzzi') {
					return <div key={listingId + index}>♨ Jacuzzi</div>
				} else {
					return <div key={listingId + index}></div>
				}
			});
		}
	}

	render() {
		const listingId = this.props.globalState.listingId;
		const listing = this.props.globalState.listingsData.find(listing => {
			return listing.id === listingId;
		});
		return (
			<div className="popup">
				<div className="listing-container">
					<div className="listing">
						<div className="image" style={{background: `url(${listing.image}) center center/cover no-repeat`}}></div>
						<div className="address">
							<div><i className="fa fa-map-marker" aria-hidden="true"></i> {listing.address}</div>
							<div className="city">{listing.city}, {listing.state}</div>
						</div>
						<div className="price">${listing.price} / month</div>
						<div className="buttons">
						{this.props.globalState.uid === listing.owner ? 
							<button className="edit" onClick={() => this.props.openPopup('EditForm')}>Edit</button> : null
						}
						{this.props.globalState.uid === listing.owner ? 
							<button className="delete" onClick={() => this.props.deleteListing(listingId)}>Delete</button> : null
						}
							<button className="close" onClick={() => this.props.closePopup('Listing')}>Close</button>
						</div>
					</div>
					<div className="details">
						<div className="space"><i className="fa fa-square-o" aria-hidden="true"></i> {listing.space}ft&sup2;</div>
						<div className="bedrooms"><i className="fa fa-bed" aria-hidden="true"></i> {listing.bedrooms} Bedrooms</div>
						<div>Type: {listing.homeType}</div>
					</div>
						<h1>Amenities</h1>
						<div className="amenities">
							{this.displayAmenities()}
						</div>
				</div>
			</div>
		);
	}
}

export default ViewListing;