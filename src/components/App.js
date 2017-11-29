import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Listings from './Listings';
import listingsData from './data/listingsData';
import AddListingForm from './AddListingForm';
import ViewListing from './ViewListing';
import EditListingForm from './EditListingForm';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import base from '../base';
import firebase from '../firebase';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			listingsData: [],
			city: 'All',
			homeType: 'All',
			bedrooms: 1,
			min_price: 0,
			max_price: 100000,
			min_space: 0,
			max_space: 100000,
			elevator: false,
			pool: false,
			jacuzzi: false,
			gym: false,
			filteredListings: {},
			populateFormsData: {
				homeTypes: [],
				bedrooms: [],
				cities: []
			},
			sortby: 'Lowest Price',
			view: 'small',
			search: '',
			popupAddForm: false,
			popupListing: false,
			popupEditForm: false,
			popupRegisterForm: false,
			popupSignInForm: false,
			listingId: null,
			uid: null
		}

		this.changeState = this.changeState.bind(this);
		this.changeView = this.changeView.bind(this);
		this.addListing = this.addListing.bind(this);
		this.deleteListing = this.deleteListing.bind(this);
		this.editListing = this.editListing.bind(this);
		this.viewListing = this.viewListing.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.loadSampleListings = this.loadSampleListings.bind(this);
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	};

	componentWillMount() {
		this.ref = base.syncState(`/`, {
			context: this,
			state: 'listingsData',
			asArray: true,
			then(data){
				this.filterListings();
				this.populateForms();
				this.state.listingsData.sort((a, b) => {
					return a.price - b.price;
				});
			}
		});
	}

	fetchAndUpdate() {
		base.fetch('/', {
			context: this,
			asArray: true,
			then(data){
				this.filterListings();
				this.populateForms();
				this.state.listingsData.sort((a, b) => {
					return a.price - b.price;
				});
			}
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

		if (this.state.jacuzzi) {
			filteredListings = filteredListings.filter(listing => {
				return listing.amenities.find(amenity => {
					return amenity === 'jacuzzi';
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
		});
	}

	changeView(view) {
		this.setState({
			view
		});
	}

	addListing(listing) {
		const listingsData = [...this.state.listingsData];

		this.closePopup('AddForm');
		listingsData.push(listing);
		this.setState({
			listingsData
		});
		this.fetchAndUpdate();
	}

	editListing(newListing) {
		const listingsData = [...this.state.listingsData];
		const index = listingsData.findIndex(listing => {
			return listing.id === this.state.listingId;
		});

		listingsData[index] = newListing;
		this.closePopup('EditForm'); 
		this.setState({
			listingsData
		});
		this.fetchAndUpdate();
	}

	deleteListing(listingId) {
		let listingsData = [...this.state.listingsData];
		listingsData = listingsData.filter(listing => {
			return listing.id !== listingId;
		});

		this.closePopup('Listing');
		this.setState({
			listingsData
		});
		this.fetchAndUpdate();
	}

	viewListing(listingId) {
		this.setState({
			listingId,
			popupListing: true
		},() => {
			this.filterListings();
		});
	}

	openPopup(type) {
		const key = `popup${type}`;
		this.setState({
			[key]: true
		});
	}

	closePopup(type) {
		const key = `popup${type}`;
		this.setState({
			[key]: false
		});
	}

	loadSampleListings() {		
		this.setState({
			listingsData
		});
		this.fetchAndUpdate();
	}

	resetFilter() {
		this.setState({
			city: 'All',
			homeType: 'All',
			bedrooms: 1,
			min_price: 0,
			max_price: 100000,
			min_space: 0,
			max_space: 100000,
			elevator: false,
			pool: false,
			jacuzzi: false,
			gym: false
		}, () => {
			this.filterListings();
		});
	}

	handleRegistration(username, password) {
		firebase.auth().createUserWithEmailAndPassword(username, password).catch(error => {
			if (error.code === 'auth/weak-password') {
				alert('The password is too weak');
			} else {
				alert(error.message);
			}
		});

		this.handleAuth();
	}

	handleAuth() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ uid: user.email }, () => {
					this.closePopup('SignInForm');
					this.closePopup('RegisterForm');
				});
			} else {
				console.log('No user');
			}
		});	
	}

	handleSignIn(username, password) {
		firebase.auth().signInWithEmailAndPassword(username, password).catch(error => {
			if (error.code === 'auth/wrong-password') {
				alert('Wrong password');
			} else {
				alert(error.message);
			}
		});
		console.log('signed in');


		this.handleAuth();
	}

	handleSignOut() {
		firebase.auth().signOut().then(() => {
			console.log('Signin out');
			this.setState({ uid: null });
		}).catch((error) => {
			alert(error);
		});
	}

	render() {
		const { popupListing, popupAddForm, popupRegisterForm, popupSignInForm } = this.state;

		if (popupListing || popupAddForm || popupRegisterForm || popupSignInForm) {
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			document.querySelector('body').style.overflow = '';
		}

		return (
			<div>
				<Header
					openPopup={this.openPopup} 
					loadSampleListings={this.loadSampleListings} 
					globalState={this.state}
					handleSignOut={this.handleSignOut}
				/>
				<section id="content-area">
					<Filter 
						globalState={this.state} 
						changeState={this.changeState} 
						resetFilter={this.resetFilter} 
					/>
					<Listings 
						globalState={this.state} 
						filteredListings={this.state.filteredListings}
						viewListing={this.viewListing} 
						changeView={this.changeView} 
						changeState={this.changeState} 
					/>
					{this.state.popupAddForm ? 
						<AddListingForm globalState={this.state} closePopup={this.closePopup} addListing={this.addListing} /> : null
					}
					{this.state.popupListing ? 
						<ViewListing globalState={this.state} closePopup={this.closePopup} deleteListing={this.deleteListing} openPopup={this.openPopup} /> : null
					}
					{this.state.popupEditForm ? 
						<EditListingForm closePopup={this.closePopup} globalState={this.state} editListing={this.editListing} /> : null
					}
					{this.state.popupSignInForm ? 
						<SignInForm closePopup={this.closePopup}  handleSignIn={this.handleSignIn} /> : null
					}
					{this.state.popupRegisterForm ? 
						<RegisterForm closePopup={this.closePopup} handleRegistration={this.handleRegistration} /> : null
					}
				</section>
			</div>
		)
	}
}

export default App;