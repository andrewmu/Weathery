import React, { Component } from 'react';
import './App.css';

import LocationForm from './components/LocationForm';
import WeatherDay from './components/WeatherDay';

import { getForecastFromCity, getForecastFromLatLon } from './services/WeatherService';


class App extends Component {

  constructor(props) {
    super(props);

    // Even without using the geolocation API we can possibly get the country from the browser language/locale (e.g. "en-GB")
    // We could add the IE browserLanguage
    const countryGuess = (navigator.language && navigator.language.substr(3)) || undefined;

    this.state = {
      city: "",
      country: countryGuess,
      weather: null
    }

    this.setCity = this.setCity.bind(this);
    this.setCountry = this.setCountry.bind(this);

    this.lookupCity = this.lookupCity.bind(this);
  }

  setCity(city) {
    this.setState({ city });
  }

  setCountry(country) {
    this.setState({ country });
  }

  lookupCity() {
    let city = this.state.city;
    let country = this.state.country;

    getForecastFromCity(city, country)
      .then(data => {
        if (data.cod === 200) {
          this.setState({ weather: data, city: data.city.name });
        }
        else {
          // Some error
        }
      })//this.setState({ weather: data }))
      .catch((err) => {
        console.log("Didn't work because: ", err);
      });      
  }

  componentDidMount() {
    // Try using the geolocation API in the browser to avoid user interaction
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { // success callback
          getForecastFromLatLon(position.coords.latitude, position.coords.longitude)
            .then(data => {
              if (data.cod === 200) {
                this.setState({ weather: data, city: data.city.name, country: data.city.country });
              }
              else {
                // Some error
              }
            });
        },
        (err) => { // failure callback
          console.log("geolocation didn't work", err);
        }
      );
    }
  }

  render() {
    let outlook = this.state.weather && this.state.weather.list[0];
    console.log("weather.outlook", outlook);

    return (
      <div className="App">
        <LocationForm city={this.state.city} country={this.state.country} setCity={this.setCity} setCountry={this.setCountry} lookupCity={this.lookupCity}/>
        <header className="App-header">
          <h1>Weathery</h1>
        </header>
        <div>
          <h3>{this.state.weather && this.state.weather.city.name}</h3>
        </div>
        <WeatherDay day="Today" outlook={outlook} />
      </div>
    );
  }
}

export default App;
