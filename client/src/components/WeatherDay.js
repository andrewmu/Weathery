import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./WeatherDay.css";

class WeatherDay extends Component {

    render() {
        const forecast = this.props.forecast;

        const iconName = (forecast && forecast.weather[0].icon);
        // This is a cheeky way to differentiate day and night:
        // The day icons end in "d" and the night ones in "n"
        const isDay = (iconName || "").slice(-1) !== 'n';   

        let dayName = null;
        if (this.props.day === 0) {
            dayName = "Today";
        }
        else if (this.props.day === 1) {
            dayName = "Tomorrow";
        }
        else {
            // Get the date that this day refers to (relative to our current timezone, don't trust the API timestamp)
            let date = new Date((new Date()).getTime() + (this.props.day * 60*60*24*1000));

            // This will actually give a localised day name, e.g. Dienstag / Mardi, etc.
            dayName = date.toLocaleString(navigator.language, {weekday: 'long'}); // FIXME: IE locale is different
        }

        // If all the temperatures are the same for this day, there's no point showing the "range"
        const sameTemps = forecast ? (forecast.main.temp !== forecast.main.temp_max) || (forecast.main.temp !== forecast.main.temp_min) : false;

        let precipitation = "";
        let windDir = '';
        if (forecast) {
            if (forecast.rain) {
                let percent = Math.floor(100*forecast.rain['3h']); // round to integer percent
                if (percent > 10) precipitation = String.fromCharCode(55357)+String.fromCharCode(56487) + percent + "%";
            }
            else if (forecast.snow) {
                let percent = Math.floor(100*forecast.snow['3h']); // round to integer percent
                if (percent > 10) precipitation = String.fromCharCode(10052) + percent + "%";
            }

            // Unicode arrows representing ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
            const directions = [0x2191, 0x2197, 0x2192, 0x2198, 0x2193, 0x2199, 0x2190, 0x2196].map(n => String.fromCharCode(n));
            const degrees = forecast.wind.deg;
            const index = Math.floor(Math.abs(((1*degrees + 22.5) % 360) / 45));
            windDir = directions[index] + Math.round((3600*forecast.wind.speed)/1000) + " km/s";
        }

        return (
            <div className={`weather-day ${isDay ? "day" : "night"} ${this.props.size==='large' ? 'large' : ''}`}>
                { forecast && <img className="icon" alt="" src={`http://openweathermap.org/img/w/${iconName}.png`}/> }
                <div className="day-name">{dayName}</div>
                { forecast &&
                <div className="info-area">
                    <div className="description">{forecast.weather[0].main}</div>
                    <div className="temp-area">
                        <div className="temp-main">{Math.round(forecast.main.temp)}&deg;C</div>
                        { sameTemps &&
                            <div className="temp-max">{Math.round(forecast.main.temp_max)}&deg;C</div>
                        }
                        { sameTemps &&
                            <div className="temp-min">{Math.round(forecast.main.temp_min)}&deg;C</div>
                        }
                    </div>
                    <div className="other-info">
                        <div className="wind">{windDir}</div>
                        <div className="precipitation">{precipitation}</div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

WeatherDay.propTypes = {
    day: PropTypes.number,
    forecast: PropTypes.object
};

export default WeatherDay;