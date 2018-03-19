import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import WeatherDay from './WeatherDay';

it('renders without crashing', () => {
    const forecast = undefined; // No forecast yet

    const div = document.createElement('div');
    ReactDOM.render(<WeatherDay day={0} forecast={forecast} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the correct day labels', () => {
    const forecast = undefined; // No forecast yet

    const weatherDay0 = shallow(<WeatherDay day={0} forecast={forecast} />);
    expect(weatherDay0.find('[className="day-name"]').text()).toBe('Today')

    const weatherDay1 = shallow(<WeatherDay day={1} forecast={forecast} />);
    expect(weatherDay1.find('[className="day-name"]').text()).toBe('Tomorrow')

    // There's an issue testing these because we don't know which day we're running on
    // and we don't want to end up writing (and debugging!) more code than we're testing

    const weatherDay2 = shallow(<WeatherDay day={2} forecast={forecast} />);
    expect(weatherDay2.find('[className="day-name"]').text()).not.toBe('Today');
    expect(weatherDay2.find('[className="day-name"]').text()).not.toBe('Tomorrow');

    const weatherDay3 = shallow(<WeatherDay day={3} forecast={forecast} />);
    expect(weatherDay3.find('[className="day-name"]').text()).not.toBe('Today');
    expect(weatherDay3.find('[className="day-name"]').text()).not.toBe('Tomorrow');
});

it('renders a snowy weather forecast', () => {
    const forecast = {
        main: {
            temp: 1.2,
            temp_min: 0,
            temp_max: 1.4
        },
        weather: [{id: 600, main: "Snow", description: "light snow", icon: "13n"}],
        snow: {'3h': 0.6125},
        wind: {
            deg: 270,
            speed: 1
        }
    };

    const weatherDay = shallow(<WeatherDay day={0} forecast={forecast} />);
    expect(weatherDay.find('[className="day-name"]').text()).toBe('Today')

    expect(weatherDay.find('img').prop('src')).toBe('http://openweathermap.org/img/w/13n.png');

    expect(weatherDay.find('[className="temp-main"]').text()).toBe('1°C');
    expect(weatherDay.find('[className="temp-max"]').text()).toBe('1°C');
    expect(weatherDay.find('[className="temp-min"]').text()).toBe('0°C');

    expect(weatherDay.find('[className="description"]').text()).toBe('Snow');
    expect(weatherDay.find('[className="wind"]').text()).toBe('←4 km/s');
    expect(weatherDay.find('[className="precipitation"]').text()).toBe('❄61%');
});

it('renders a rainy weather forecast', () => {
    const forecast = {
        main: {
            temp: 23.2,
            temp_min: 19,
            temp_max: 24.1
        },
        weather: [{id: 600, main: "Rain", description: "light rain", icon: "10n"}],
        rain: {'3h': 0.435},
        wind: {
            deg: 180,
            speed: 2
        }
    };

    const weatherDay = shallow(<WeatherDay day={0} forecast={forecast} />);
    expect(weatherDay.find('[className="day-name"]').text()).toBe('Today')
    
    expect(weatherDay.find('img').prop('src')).toBe('http://openweathermap.org/img/w/10n.png');

    expect(weatherDay.find('[className="temp-main"]').text()).toBe('23°C');
    expect(weatherDay.find('[className="temp-max"]').text()).toBe('24°C');
    expect(weatherDay.find('[className="temp-min"]').text()).toBe('19°C');

    expect(weatherDay.find('[className="description"]').text()).toBe('Rain');
    expect(weatherDay.find('[className="wind"]').text()).toBe('↓7 km/s');
    expect(weatherDay.find('[className="precipitation"]').text()).toBe('💧43%');
});