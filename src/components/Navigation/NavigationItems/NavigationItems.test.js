import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

// describe('<NavigationItems />', () => {
//   it('should render two <NavigationItem /> elements if not authenticated', () => {
//     const wrapper = shallow(<NavigationItems />);
//     expect(wrapper.find(NavigationItem)).toHaveLength(2);
//   });
//   it('should render three <NavigationItem /> elements if authenticated', () => {
//     const wrapper = shallow(<NavigationItems isAuthenticated/>);
//     expect(wrapper.find(NavigationItem)).toHaveLength(3);
//   });
// })

//notice that we are not testing redux here.  To test redux, test the reducers
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should render a NavigationItem with logout route if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
  it('should render a NavigationItem with auth route if not authenticated', () => {
    wrapper.setProps({isAuthenticated: false});
    expect(wrapper.contains(<NavigationItem link="/auth">Authenticate</NavigationItem>)).toEqual(true);
  });
})