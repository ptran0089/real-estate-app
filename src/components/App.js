import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Listings from './Listings';
import listingsData from './data/listingsData';
import AddListingForm from './AddListingForm';
import ViewListing from './ViewListing';
import EditListingForm from './EditListingForm';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			listingsData,
			city: 'All',
			homeType: 'All',
			bedrooms: 1,
			min_price: 0,
			max_price: 100000,
			min_space: 0,
			max_space: 100000,
			elevator: false,
			pool: false,
			basement: false,
			gym: false,
			filteredListings: listingsData,
			sortby: 'Lowest Price',
			view: 'small',
			search: '',
			popupAddForm: false,
			popupListing: false,
			popupEditForm: false,
			listingId: null
		}

		this.changeState = this.changeState.bind(this);
		this.changeView = this.changeView.bind(this);
		this.closeAddForm = this.closeAddForm.bind(this);
		this.openAddForm = this.openAddForm.bind(this);
		this.addListing = this.addListing.bind(this);
		this.viewListing = this.viewListing.bind(this);
		this.closeListing = this.closeListing.bind(this);
		this.deleteListing = this.deleteListing.bind(this);
		this.closeEditForm = this.closeEditForm.bind(this);
		this.openEditForm = this.openEditForm.bind(this);
		this.editListing = this.editListing.bind(this);
	};

	componentWillMount() {
		this.populateForms();
		this.state.listingsData.sort((a, b) => {
			return a.price - b.price;
		});
	}

	populateForms() {
		let cities = this.state.listingsData.map(listing => listing.city);
		cities = new Set(cities);
		cities = [...cities];
		cities.sort();

		let homeTypes = this.state.listingsData.map(listing => listing.homeType);
		homeTypes = new Set(homeTypes);
		homeTypes = [...homeTypes];
		homeTypes.sort(); 

		let bedrooms = this.state.listingsData.map(listing => listing.bedrooms);
		bedrooms = new Set(bedrooms);
		bedrooms = [...bedrooms];
		bedrooms.sort((a, b) => {
			return a - b;
		});

		this.setState({
			populateFormsData: {
				homeTypes,
				bedrooms,
				cities
			}
		}, () => {
			console.log(this.state.populateFormsData);
		}); 
	}

	filterListings() {
		let filteredListings = this.state.listingsData.filter(listing => {
			return listing.price >= this.state.min_price
				&& listing.price <= this.state.max_price
				&& listing.space >= this.state.min_space
				&& listing.space <= this.state.max_space
				&& listing.bedrooms >= this.state.bedrooms;
		});

		if (this.state.city !== 'All') {
			filteredListings = filteredListings.filter(listing => {
				return listing.city === this.state.city;
			});
		}

		if (this.state.homeType !== 'All') {
			filteredListings = filteredListings.filter(listing => {
				return listing.homeType === this.state.homeType;
			});
		}

		if (this.state.basement) {
			filteredListings = filteredListings.filter(listing => {
				return listing.amenities.find(amenity => {
					return amenity === 'basement';
				});
			});
		}
		
		if (this.state.pool) {
			filteredListings = filteredListings.filter(listing => {
				return listing.amenities.find(amenity => {
					return amenity === 'pool';
				});
			});
		}
		
		if (this.state.elevator) {
			filteredListings = filteredListings.filter(listing => {
				return listing.amenities.find(amenity => {
					return amenity === 'elevator';
				});
			});
		}
		
		if (this.state.gym) {
			filteredListings = filteredListings.filter(listing => {
				return listing.amenities.find(amenity => {
					return amenity === 'gym';
				});
			});
		}

		if (this.state.sortby === 'Highest Price') {
			filteredListings = filteredListings.sort((a, b) => {
				return b.price - a.price;
			});
		}

		if (this.state.sortby === 'Lowest Price') {
			filteredListings = filteredListings.sort((a, b) => {
				return a.price - b.price;
			});
		}

		if (this.state.search) {
			filteredListings = filteredListings.filter(listing => {
				const city = listing.city.toLowerCase();
				const search = this.state.search.toLowerCase();

				return city.match(search);
			});
		}

		this.setState({
			filteredListings
		});
	}

	changeState(e) {
		const name = e.target.name;
		const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;

		this.setState({
			[name]: value
		}, () => {
			this.filterListings();
			console.log(this.state);
		});
	}

	changeView(view) {
		this.setState({
			view
		}, () => {
			console.log(this.state);
		});
	}

	addListing(listing) {
		const listingsData = [...this.state.listingsData];

		this.closeAddForm();
		listingsData.push(listing);
		this.setState({
			listingsData
		}, () => {
			this.populateForms();
			this.filterListings();
		});

		console.log(this.state);
	}

	editListing(newListing) {
		const listingsData = [...this.state.listingsData];
		const index = listingsData.findIndex(listing => {
			return listing.id === this.state.listingId;
		});

		listingsData[index] = newListing;
		this.closeEditForm(); 
		this.setState({
			listingsData
		}, () => {
			this.populateForms();
			this.filterListings();
		});
	}

	deleteListing(listingId) {
		let listingsData = [...this.state.listingsData];
		listingsData = listingsData.filter(listing => {
			return listing.id !== listingId;
		});

		this.closeListing();
		this.setState({
			listingsData
		}, () => {
			this.filterListings();
		});
	}

	openAddForm() {
		this.setState({
			popupAddForm: true
		});
	}

	closeAddForm() {
		this.setState({
			popupAddForm: false
		});
	}

	viewListing(listingId) {
		this.setState({
			listingId,
			popupListing: true
		},() => {
			this.filterListings();
			console.log(this.state);
		});
	}

	closeListing() {
		this.setState({
			popupListing: false
		});
	}

	openEditForm() {
		this.setState({
			popupEditForm: true
		});
	}

	closeEditForm() {
		this.setState({
			popupEditForm: false
		});
	}

	render() {
		return (
			<div>
				<Header openAddForm={this.openAddForm} />
				<section id="content-area">
					<Filter globalState={this.state} changeState={this.changeState} />
					<Listings viewListing={this.viewListing} globalState={this.state} filteredListings={this.state.filteredListings} changeView={this.changeView} changeState={this.changeState} />
					{this.state.popupAddForm ? 
						<AddListingForm closeAddForm={this.closeAddForm} addListing={this.addListing} /> : null
					}
					{this.state.popupListing ? 
						<ViewListing globalState={this.state} closeListing={this.closeListing} deleteListing={this.deleteListing} openEditForm={this.openEditForm} /> : null
					}
					{this.state.popupEditForm ? 
						<EditListingForm closeEditForm={this.closeEditForm} globalState={this.state} editListing={this.editListing} /> : null
					}
				</section>
			</div>
		)
	}
}

export default App;