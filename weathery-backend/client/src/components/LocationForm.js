import React, { Component } from 'react';
import PropTypes from 'prop-types';

var countries = require('country-list')();

class LocationForm extends Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    submit(evt) {
        // This happens on a submit button click or if enter is pressed in the city input
        evt.preventDefault();
        this.props.lookupCity();
    }

    handleCityChange(event) {
        this.props.setCity(event.target.value);
    }

    handleCountryChange(event) {
        this.props.setCountry(event.target.value);
    }

    render() {
        return (
            <form onSubmit={this.submit} >
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={this.props.city} onChange={this.handleCityChange}/>

                <label htmlFor="country">Country</label>
                <select name="country" id="country" value={this.props.country} onChange={this.handleCountryChange}>
                    {countries.getData().map(entry => 
                        <option value={entry.code} key={entry.code}>{entry.name}</option>
                    )}
                </select>

                <input type="submit" value="Go" />
            </form>
        );
    }
}

LocationForm.propTypes = {
    city: PropTypes.string,
    country: PropTypes.string
};

export default LocationForm;