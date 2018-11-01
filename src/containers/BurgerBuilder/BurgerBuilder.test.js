import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


//notice that we are not testing redux here.  To test redux, test the reducers
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitialIngredients={() => {}} />);
  });
  it('should render BuildControls if props.ingredients is truthy', () => {
    wrapper.setProps({ingredients: {
      salad: 0,
      lettuce: 0,
      bacon: 0,
      meat: 0
    }});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
})