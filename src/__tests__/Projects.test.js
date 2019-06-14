import React from 'react';
import ReactDOM from 'react-dom';
import Projects from '../components/Projects';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import projectsJson from '../static/projects';

Enzyme.configure({ adapter: new Adapter() });

describe('<Projects/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Projects/>, div);
  });

  it('renders the correct number of cards from projects.json', () => {
    const component = shallow(<Projects/>);
    expect(component.children()).toHaveLength(projectsJson.length);
  });
});