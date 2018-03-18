
function getForecastWithQuery(query) {
    return fetch(`/api/weather/5days?${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== "200") {
                throw data.message;
            }
            else {
                return data;
            } 
        })
}

function getForecastFromCity(city, countryCode) {
    return getForecastWithQuery(`city=${encodeURIComponent(city)}&country=${countryCode}`);
}

function getForecastFromLatLon(lat, lon) {
    return getForecastWithQuery(`lat=${encodeURIComponent(lat)}&lon=${lon}`);
}

// We could try and fall back to using an IP based location lookup service if geolocation didn't work,
// but they aren't very usually reliable, so just let the user input their own location

export {
    getForecastFromCity,
    getForecastFromLatLon
};