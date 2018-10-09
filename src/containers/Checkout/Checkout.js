import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount(){
    console.log('[Checkout.js] value of props.location.search in componentWillMount: ', this.props.location.search);//?bacon=0&cheese=0&meat=2&salad=1

    /**
     * URLSearchParams will parse the string in props.location.search and covert it to an URLSearchParams object, ignoring the "?"
     */
    const query = new URLSearchParams( this.props.location.search );
    console.log('[Checkout.js] value of query const in componentWillMount: ', query.toString())//URLSearchParams {bacon=0&cheese=0&meat=2&salad=1}

    
    const ingredients = {};
    let price = 0;
    /**
     * now iterate over the URLSearchParams object and populate the ingredients object created above.
     * The URLSearchParams interface defines utility methods to work with the query string of a URL.
     */
    for (let param of query) {
      if(param[0] === 'price'){
        price = param[1];
      } else {
      ingredients[param[0]] = +param[1];
    }
  }
    console.log('[Checkout] componentWillMount value of ingredients: ', ingredients);//{bacon: 0, cheese: 0, meat: 2, salad: 1}

    this.setState({
      ingredients: ingredients,
      totalPrice: price
    })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    console.log('[Checkout.js] "this" value in checkoutContinuedHandler: ', this)
    this.props.history.replace('/checkout/contact-data');
  };
 
  /**
   * the props.match.path property below is available in Checkout, because Checkout was a <Route> in the App.js file "<Route path="/checkout" component={Checkout} />".  As part of the <Route> implementation, you get three route props appended to the component: match, location, and history. 
   */
  render() {
    console.log('[Checkout.js] state.ingredients object passed to CheckoutSummary in render', this.state.ingredients);
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients} 
          placeOrder={this.checkoutContinuedHandler} 
          cancelOrder={this.checkoutCancelledHandler}/>
        <Route 
          path={this.props.match.path +'/contact-data'} 
          /* component={ContactData} replacing this component attribute with render attribute below so that we can pass the ingredients attribute directly.  Because we render this component manually here, the new component will not get the three router appended properties: history, match and location.  So we have added props as an argument to get Checkout component router properties with the newly rendered ContactData component.  We could also have wrapped the ContactData component export statement with the withRouter method like this: export default withRouter(ContactData)   */
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} 
          {...props}/>)}
           />
      </div>

    );
  }
}

export default Checkout;