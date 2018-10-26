import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
  /**
   * This was previously a functional component.  We turned it into a class based component so we could do a demonstration of the componentWillUpdate.
   */
  componentWillUpdate(){
    console.log('[OrderSummary] componentWillUpdate');
  }

  render () { 
    //first convert the ingredients object to a new array, containing the property names, not the values of the original object
  const ingredientSummary = Object.keys(this.props.ingredients)
  //now iterate over the new array and create another new array that contains jsx "li" elements.  The elements will have a span with the name of the ingredient (i.e., Cheese) and text representing the value (in this case the quantity of each ingredient) that you get from the props.ingredients object that was passed in.
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>{key}</span>: 
          {this.props.ingredients[key]}
        </li>
      )
    });
    
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.clickedDanger}    btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.clickedSuccess} btnType="Success">CONTINUE</Button>
      </Aux>
    )
  }
};

export default OrderSummary;