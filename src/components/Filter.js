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
		const { toggleMenu, changeState, resetFilter, globalState: {city, homeType, bedrooms, min_price, max_price, min_space, max_space, elevator, pool, jacuzzi, gym} } = this.props;

		return (
			<div id="filter">
				<div className="menu" onClick={toggleMenu}>SIGN IN &#9776;</div>
				<div className="container">
					<h4>FILTER</h4>
					<label htmlFor="city">City</label>
					<select name="city" id="city" onChange={changeState} value={city}>
						<option value="All">All</option>
						{this.populateCities()};
					</select>

					<label htmlFor="homeType">Type</label>
					<select name="homeType" id="type" onChange={changeState} value={homeType}>
						<option value="All">All</option>
						{this.populateHomeTypes()};
					</select>

					<label htmlFor="bedrooms">Bedrooms</label>
					<select name="bedrooms" id="bedrooms" onChange={changeState} value={bedrooms}>
						{this.populateBedrooms()};
					</select>

					<div className="price">
						<h5>Price</h5>
						<input type="text" name="min_price" value={min_price} onChange={changeState} />
						<input type="text" name="max_price" value={max_price}  onChange={changeState}/>
					</div>

					<div className="floor-space">
						<h5>Floor Space</h5>
						<input type="text" name="min_space" value={min_space}  onChange={changeState}/>
						<input type="text" name="max_space" value={max_space}  onChange={changeState}/>
					</div>

					<div className="amenities">
						<h5>Amenities</h5>
						<label>
							Elevator
							<input type="checkbox" name="elevator" value="elevator" checked={elevator ? 'checked' : ''} onChange={changeState}/>
						</label>
						<label>
							Swimming Pool
							<input type="checkbox" name="pool" value="pool" checked={pool ? 'checked' : ''} onChange={changeState}/>
						</label>
						<label>
							Jacuzzi
							<input type="checkbox" name="jacuzzi" value="jacuzzi" checked={jacuzzi ? 'checked' : ''} onChange={changeState}/>
						</label>
						<label>
							Gym
							<input type="checkbox" name="gym" value="gym" checked={gym ? 'checked' : ''} onChange={changeState}/>
						</label>
					</div>
					<button className="reset" onClick={resetFilter}>Reset Filters</button>
				</div>
			</div>
		)
	}
}

export default Filter;