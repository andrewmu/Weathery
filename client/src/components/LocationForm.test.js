import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import LocationForm from './LocationForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationForm setCity={jest.fn()} setCountry={jest.fn()} lookupCity={jest.fn()} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('updates the city', () => {
    const cityName = 'TestCity';

    const setCity = jest.fn();
    const form = shallow(<LocationForm setCity={setCity} setCountry={jest.fn()} lookupCity={jest.fn()} />);

    form.find('#city').simulate('change', {target: { value: cityName }} );

    expect(setCity.mock.calls.length).toBe(1);
    expect(setCity.mock.calls[0][0]).toBe(cityName);
});

it('updates the country', () => {
    const countryCode = 'GB';

    const setCountry = jest.fn();
    const form = shallow(<LocationForm setCity={jest.fn()} setCountry={setCountry} lookupCity={jest.fn()} />);

    form.find('#country').simulate('change', {target: { value: countryCode }} );

    expect(setCountry.mock.calls.length).toBe(1);
    expect(setCountry.mock.calls[0][0]).toBe(countryCode);
});

it('starts a lookup', () => {
    const lookupCity = jest.fn();
    const preventDefault = jest.fn();
    
    const form = shallow(<LocationForm setCity={jest.fn()} setCountry={jest.fn()} lookupCity={lookupCity} />);

    form.find('form').simulate('submit', { preventDefault } );

    expect(lookupCity.mock.calls.length).toBe(1);
    expect(preventDefault.mock.calls.length).toBe(1);
});