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
      lookupStatus: undefined,
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

    this.setState({ lookupStatus: "pending" });  // Ignore any pending geolocation based response

    getForecastFromCity(city, country)
      .then(data => {
        this.setState({ weather: data, city: data.city.name });
        this.setState({ lookupStatus: "finished" });
      })
      .catch((err) => {
        console.log("Didn't work because: ", err);
        this.setState({ lookupStatus: "failed" });
      });      
  }

  componentDidMount() {
    // Try using the geolocation API in the browser to avoid user interaction
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { // success callback
          if (!this.state.lookupStatus) { // Check we're not doing a lookup
            this.setState({ lookupStatus: "geolocation-pending" });
            getForecastFromLatLon(position.coords.latitude, position.coords.longitude)
              .then(data => {
                if (this.state.lookupStatus === "geolocation-pending") { // Make sure we're still interested in this response
                  if (data.cod === "200") {
                    this.setState({ weather: data, city: data.city.name, country: data.city.country });
                  }
                  else {
                    // Some error
                    console.log("cod wasn't 200");
                  }
                }
                else {
                  console.log("status wasn't pending, ignore the result");
                }
                this.setState({ lookupStatus: "finished" });
              });
          }
        },
        (err) => { // failure callback
          console.log("geolocation didn't work", err);
        }
      );
    }
  }

  render() {
    const getForecastForDay = (day) => this.state.weather ? this.state.weather.list[8*day] : null;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Weathery</h1>
        </header>
        <LocationForm city={this.state.city} country={this.state.country} setCity={this.setCity} setCountry={this.setCountry} lookupCity={this.lookupCity}/>
        <WeatherDay day={0} forecast={getForecastForDay(0)} size="large" />
        <div className="small-days">
          <WeatherDay day={1} forecast={getForecastForDay(1)} />
          <WeatherDay day={2} forecast={getForecastForDay(2)} />
          <WeatherDay day={3} forecast={getForecastForDay(3)} />
          <WeatherDay day={4} forecast={getForecastForDay(4)} />
        </div>
      </div>
    );
  }
}

export default App;
