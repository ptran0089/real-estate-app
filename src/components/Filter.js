import React from 'react';

class Filter extends React.Component {
	populateCities() {
      const { cities } = this.props.globalState.populateFormsData;

      return cities.map((city, index) => {
        return (
          <option key={index} value={city}>{city}</option>
        )
      });
  }

  populateHomeTypes() {
  		const { homeTypes } = this.props.globalState.populateFormsData;

  		return homeTypes.map((homeType, index) => {
  			return (
				<option key={index} value={homeType}>{homeType}</option>
  			)
  		});
  }

  populateBedrooms() {
  		const { bedrooms } = this.props.globalState.populateFormsData;

  		return bedrooms.map((bedroom, index) => {
  			return (
				<option key={index} value={bedroom}>{bedroom}+ BR</option>
  			)
  		});
  }
	
	render() {
		return (
			<div id="filter">
				<div className="container">
					<h4>FILTER</h4>
					<label htmlFor="city">City</label>
					<select name="city" id="city" onChange={this.props.changeState} value={this.props.globalState.city}>
						<option value="All">All</option>
						{this.populateCities()};
					</select>

					<label htmlFor="homeType">Type</label>
					<select name="homeType" id="type" onChange={this.props.changeState} value={this.props.globalState.homeType}>
						<option value="All">All</option>
						{this.populateHomeTypes()};
					</select>

					<label htmlFor="bedrooms">Bedrooms</label>
					<select name="bedrooms" id="bedrooms" onChange={this.props.changeState} value={this.props.globalState.bedrooms}>
						{this.populateBedrooms()};
					</select>

					<div className="price">
						<h5>Price</h5>
						<input type="text" name="min_price" value={this.props.globalState.min_price} onChange={this.props.changeState} />
						<input type="text" name="max_price" value={this.props.globalState.max_price}  onChange={this.props.changeState}/>
					</div>

					<div className="floor-space">
						<h5>Floor Space</h5>
						<input type="text" name="min_space" value={this.props.globalState.min_space}  onChange={this.props.changeState}/>
						<input type="text" name="max_space" value={this.props.globalState.max_space}  onChange={this.props.changeState}/>
					</div>

					<div className="amenities">
						<h5>Amenities</h5>
						<label>
							Elevator
							<input type="checkbox" name="elevator" value="elevator" checked={this.props.globalState.elevator ? 'checked' : ''} onChange={this.props.changeState}/>
						</label>
						<label>
							Swimming Pool
							<input type="checkbox" name="pool" value="pool" checked={this.props.globalState.pool ? 'checked' : ''} onChange={this.props.changeState}/>
						</label>
						<label>
							Jacuzzi
							<input type="checkbox" name="jacuzzi" value="jacuzzi" checked={this.props.globalState.jacuzzi ? 'checked' : ''} onChange={this.props.changeState}/>
						</label>
						<label>
							Gym
							<input type="checkbox" name="gym" value="gym" checked={this.props.globalState.gym ? 'checked' : ''} onChange={this.props.changeState}/>
						</label>
					</div>
					<button className="reset" onClick={this.props.resetFilter}>Reset Filters</button>
				</div>
			</div>
		)
	}
}

export default Filter;