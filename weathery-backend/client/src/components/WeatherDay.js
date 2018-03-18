import React, { Component } from 'react';

class WeatherDay extends Component {

    constructor(props) {
        super(props);
        console.log("WeatherDay", props);
    }

    render() {
        console.log("WeatherDay.props", this.props);

        console.log("outlook", this.props.outlook);

        return (
            <div className="weather-day">
                <h2>{this.props.day}</h2>
                { this.props.outlook &&
                    <dl>
                        <dt>Outlook</dt>
                        <dd>{this.props.outlook.weather[0].main}</dd>
                        <dt>Temperature</dt>
                        <dd>{this.props.outlook.main.temp}&deg;C
                            [{this.props.outlook.main.temp_max}&deg;C,
                            {this.props.outlook.main.temp_min}&deg;C]
                        </dd>
                    </dl>
                }
            </div>
        );
    }

}

export default WeatherDay;