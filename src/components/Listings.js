import React from 'react';

class Listings extends React.Component {
	displayListings() {
		if (this.props.filteredListings.length > 0) {
			return this.props.filteredListings.map((listing, index) => {
				return (
					<div key={index} className="listing">
						<div className="image" style={{background: `url(${listing.listingInfo.image}) center center no-repeat`}}>
							<div className="address">{listing.listingInfo.address}</div>
							<div className="details">
								<div className="space-details"><i className="fa fa-square-o" aria-hidden="true"></i> {listing.listingInfo.space}ft&sup2;</div>
								<div className="bedroom-details"><i className="fa fa-bed" aria-hidden="true"></i> {listing.listingInfo.bedrooms} bedrooms</div>
								<div className="view-listings" onClick={() => this.props.viewListing(listing.listingInfo.id)}>View Listings</div>
							</div>
						</div>
						<div className="info">
							<div className="price">{listing.listingInfo.price} / month</div>
							<div className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>{listing.listingInfo.city}, {listing.listingInfo.state}</div>
						</div>
					</div>
				)
			});
		} else {
			return 'Sorry we did not find any listings that matched your preferences.'
		}
	}

	render() {
		return (
			<div id="listings">
				<input type="text" id="search" name="search" onChange={this.props.changeState} placeholder="Search city"/>
				<div className="listings-header">
					<p className="results">{this.props.filteredListings.length} results found</p>
					<div className="sort-view">
						<select name="sortby" className="sort" onChange={this.props.changeState}>
							<option value="Lowest Price">Lowest Price</option>
							<option value="Highest Price">Highest Price</option>
						</select>
						<div className="view">
		              <i className="fa fa-th" aria-hidden="true" onClick={this.props.changeView.bind(null, 'small')}></i>
		              <i className="fa fa-th-list" aria-hidden="true" onClick={this.props.changeView.bind(null, 'large')}></i>
		            </div>
					</div>
				</div>

				<div id="listings-area" className={this.props.globalState.view === 'large' ? 'large-view' : ''}>
					{this.displayListings()}
				</div>
				
				<div id="pagination">
					<ul className="pages">
						<li>Prev</li>
						<li className="active">1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>Next</li>				
					</ul>
				</div>
			</div>
		)
	}
}

export default Listings;