
function getForecastFromCity(city, countryCode) {
    return fetch(`/api/weather/5days?city=${encodeURIComponent(city)}&country=${countryCode}`)
        .then(res => res.json())
        .catch((err) => {
            console.log("Didn't work because: ", err);
        });
}

function getForecastFromLatLon(lat, lon) {
    return fetch(`/api/weather/5days?lat=${encodeURIComponent(lat)}&lon=${lon}`)
        .then(res => res.json())
        .catch((err) => {
            console.log("Didn't work because: ", err);
        });
}

// We could try and fall back to using an IP based location lookup service if geolocation didn't work,
// but they aren't very usually reliable, so just let the user input their own location

export {
    getForecastFromCity,
    getForecastFromLatLon
};