import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Listings from './Listings';
import listingsData from './data/listingsData';
import AddListingForm from './modals/AddListingForm';
import ViewListing from './modals/ViewListing';
import EditListingForm from './modals/EditListingForm';
import SignInForm from './modals/SignInForm';
import RegisterForm from './modals/RegisterForm';
import About from './modals/About';
import firebase from '../firebase';
import _ from 'lodash';

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
			popupAbout: false,
			listingId: null,
			uid: null,
			userEmail: null,
			username: null,
			menu: false
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
		this.toggleMenu = this.toggleMenu.bind(this);
	};

	componentWillMount() {
		const databaseRef = firebase.database().ref('/listings');

		databaseRef.on('value', snapshot => {
			this.setState({
				listingsData: snapshot.val()
			}, () => {
				this.filterListings();
				this.populateForms();
			});
		});
	}

	populateForms() {
		let cities = _.map(this.state.listingsData, listing => listing.listingInfo.city);
		cities = new Set(cities);
		cities = [...cities];
		cities.sort();

		let homeTypes = _.map(this.state.listingsData, listing => listing.listingInfo.homeType);
		homeTypes = new Set(homeTypes);
		homeTypes = [...homeTypes];
		homeTypes.sort(); 

		let bedrooms = _.map(this.state.listingsData, listing => listing.listingInfo.bedrooms);
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
		let filteredListings = _.filter(this.state.listingsData, listing => {
			return listing.listingInfo.price >= this.state.min_price
				&& listing.listingInfo.price <= this.state.max_price
				&& listing.listingInfo.space >= this.state.min_space
				&& listing.listingInfo.space <= this.state.max_space
				&& listing.listingInfo.bedrooms >= this.state.bedrooms;
		});

		if (this.state.city !== 'All') {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.city === this.state.city;
			});
		}

		if (this.state.homeType !== 'All') {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.homeType === this.state.homeType;
			});
		}

		if (this.state.jacuzzi) {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.amenities.find(amenity => {
					return amenity === 'jacuzzi';
				});
			});
		}
		
		if (this.state.pool) {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.amenities.find(amenity => {
					return amenity === 'pool';
				});
			});
		}
		
		if (this.state.elevator) {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.amenities.find(amenity => {
					return amenity === 'elevator';
				});
			});
		}
		
		if (this.state.gym) {
			filteredListings = filteredListings.filter(listing => {
				return listing.listingInfo.amenities.find(amenity => {
					return amenity === 'gym';
				});
			});
		}

		if (this.state.sortby === 'Highest Price') {
			filteredListings = filteredListings.sort((a, b) => {
				return b.listingInfo.price - a.listingInfo.price;
			});
		}

		if (this.state.sortby === 'Lowest Price') {
			filteredListings = filteredListings.sort((a, b) => {
				return a.listingInfo.price - b.listingInfo.price;
			});
		}

		if (this.state.search) {
			filteredListings = filteredListings.filter(listing => {
				const city = listing.listingInfo.city.toLowerCase();
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
		this.closePopup('AddForm');
		const updates = {};
		updates[`/listings/${listing.id}`] = {
			owner: this.state.uid,
			listingInfo: listing
		};

		firebase.database().ref().update(updates);
	}

	editListing(newListing) {
		this.closePopup('EditForm');
		const updates = {};
		updates[`/listings/${newListing.id}/listingInfo`] = newListing;

		return firebase.database().ref().update(updates);
	}

	deleteListing(listingId) {
		this.closePopup('Listing');
		firebase.database().ref(`/listings/${listingId}`).remove();
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

	toggleMenu() {
		this.setState({
			menu: !this.state.menu
		});
	}

	loadSampleListings() {
		let listings = _.forEach(listingsData, listing => {
			listing.owner = this.state.uid
		});
		this.setState({
			listingsData: listings
		}, () => {
			firebase.database().ref('/').set({
				listings: this.state.listingsData
			});
		});
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

	handleRegistration(username, email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
			if (error.code === 'auth/weak-password') {
				alert('The password is too weak');
			} else {
				alert(error.message);
			}
		});
		
		this.handleAuth(username);
	}

	handleAuth(username) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ 
					uid: user.uid,
					userEmail: user.email,
					username: user.displayName 
				}, () => {
					this.closePopup('SignInForm');
					this.closePopup('RegisterForm');
				});
			} else {
				alert('User not found');
			}
		});	
	}

	handleSignIn(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
			if (error.code === 'auth/wrong-password') {
				alert('Wrong password');
			} else {
				alert(error.message);
			}
		});

		this.handleAuth();
	}

	handleSignOut() {
		firebase.auth().signOut().then(() => {
			this.setState({ 
				uid: null,
				userEmail: null
			 });
		}).catch((error) => {
			alert(error);
		});
	}

	render() {
		const { popupListing, popupAddForm, popupRegisterForm, popupSignInForm, popupAbout } = this.state;

		if (popupListing || popupAddForm || popupRegisterForm || popupSignInForm || popupAbout) {
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
						toggleMenu={this.toggleMenu} 
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
					{this.state.popupAbout ? 
						<About closePopup={this.closePopup} /> : null
					}
				</section>
			</div>
		)
	}
}

export default App;