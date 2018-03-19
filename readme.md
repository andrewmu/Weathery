

# Weathery

A single page application to display weather data from the OpenWeatherMap remote service.


## Installing and running

The OpenWeatherMap service requires a private API key to access, so to keep the key private by using a simple node.js service as a proxy.

### Installing and running the proxy service

* check out the repository from GitHub
* change into the Weathery/backend directory
* run `npm install`
* create a file called `config.js` in `./backend` with contents:
  ```javascript
  module.exports = {
    WEATHER_API_KEY: "<<Valid_OpenWeatherMap_API_KEY>>"
  }
  ```
* run `PORT=3001 ./bin/www`
* The service is now running as you can verify by visiting:
  http://localhost:3001/api/weather/5days?lon=-3.18&lot=55.946


### Installing and running the client

* change into Weathery/client
* run `npm install`
* run `npm start`
* the web page can now be accessed at: http://localhost:3000/


## Remaining Tasks

### Production version creation

The current application does not have a spoecific production deployment script.  It is likely that a production deployment would involve an Nginx server configured to serve the statically build production files of the React application and also include an internal rewrite rule to forward the API calls to the Node.js proxy.

### Testing

Currently there is only unit testing of the LocationForm and WeatherDay components.  It would be desirable to do integration level testing on the App component as it controls the application state and much of the logic concerning API requests

### Error handling

The error handling is currently rudimentary.  Although the components in general remain in a consistent state if errors occur, there is almost no user reporting in that case.  A very obvious ommission is for unrecognised or incorrect city names.

### Localisation

The client page has minimal localisation support.  In fact the week day names are localised, and in theory we could pass through a language parameter to OWM to get language localised weather descriptions.  All that remains then are the form labels and the 'today' and 'tomorrow' titles.

### Improve the Node.js proxy

Currently the service is simply forwarding requests to OWN, but with the API KEY added.  Obvious improvements are:

* Do local caching of common queries to reduce the traffic to the OpenWeatherMap service.

* Transform the responses from OWN, removing the JSON data that we are not displaying in the client.  Given that we are showing only daily data from a response that provides 3 hourly data, we could reduce the volume considerably.


### Improving the geolocation compatibility

The Geolocation API which this application attempts to use can completely remove the requirement for the user to specify their location.  Unfortunately even browsers which support it can restrict access to 'secure' pages, meaning in this case ones served from HTTPS.  If we run the production service on a web server with an HTTPS certificate, more browsers will allow geolocation.
