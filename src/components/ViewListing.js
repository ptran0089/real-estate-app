import React from 'react';
import _ from 'lodash';

class ViewListing extends React.Component {
	displayAmenities() {
		const listingId = this.props.globalState.listingId;
		const listing = _.find(this.props.globalState.listingsData, listing => {
			return listing.listingInfo.id === listingId;
		});

		if (listing.listingInfo.amenities && listing.listingInfo.amenities.length > 0) {
			return listing.listingInfo.amenities.map((amenity, index) => {
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
		const listing = _.find(this.props.globalState.listingsData, listing => {
			return listing.listingInfo.id === listingId;
		});
		return (
			<div className="popup">
				<div className="listing-container">
					<div className="listing">
						<div className="image" style={{background: `url(${listing.listingInfo.image}) center center/cover no-repeat`}}></div>
						<div className="address">
							<div><i className="fa fa-map-marker" aria-hidden="true"></i> {listing.listingInfo.address}</div>
							<div className="city">{listing.listingInfo.city}, {listing.listingInfo.state}</div>
						</div>
						<div className="price">${listing.listingInfo.price} / month</div>
						<div className="buttons">
						{
							listing.listingInfo.owner === this.props.globalState.userEmail ? 
							<button className="edit" onClick={() => this.props.openPopup('EditForm')}>Edit</button> : null
						}
						{
							listing.listingInfo.owner === this.props.globalState.userEmail ? 
							<button className="delete" onClick={() => this.props.deleteListing(listingId)}>Delete</button> : null
						}
							<button className="close" onClick={() => this.props.closePopup('Listing')}>Close</button>
						</div>
					</div>
					<div className="details">
						<div className="space"><i className="fa fa-square-o" aria-hidden="true"></i> {listing.listingInfo.space}ft&sup2;</div>
						<div className="bedrooms"><i className="fa fa-bed" aria-hidden="true"></i> {listing.listingInfo.bedrooms} Bedrooms</div>
						<div>Type: {listing.listingInfo.homeType}</div>
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