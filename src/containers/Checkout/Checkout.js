import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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
    console.log('[Checkout.js] state.ingredients object passed to CheckoutSummary in render', this.props.ingredients);
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.props.ingredients} 
          placeOrder={this.checkoutContinuedHandler} 
          cancelOrder={this.checkoutCancelledHandler}/>
        <Route 
          path={this.props.match.path +'/contact-data'} 
          component={ContactData}
        />
      </div>
      )
    }
  }

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);