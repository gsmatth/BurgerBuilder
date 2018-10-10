import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();//to prevent a request from being sent
    console.log('[ContactData] props.ingredients: ', this.props.ingredients);
        this.setState({
          loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: 'Buck Rodgers',
        address: {
          street: '1234 street',
          city: 'Bell',
          zipCode: '1234556'
        },
        emailAddress: 's@test.com',
        deliveryPreference: 'FedEx 1 day'
      }
    };
    axios.post('/orders.json', order)
      .then(response => {
        console.log('[BurgerBuilder.js] purchaseContinueHandler response: ', response);
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
      })
        .catch(err => {
          console.log('[BurgerBuilder.js] purchaseContinuedHandler error: ', err);
          this.setState({
            loading: false,
          });
        })
  }


  render(){
    let form = (
      <form >
        <input className={styles.Input} type="text" name="name" placeholder="Your name" />
        <input className={styles.Input} type="text" name="email" placeholder="billy@something.com" />
        <input className={styles.Input} type="text" name="street" placeholder="124 Blue St" />
        <input className={styles.Input} type="text" name="postalCode" placeholder="45555" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>
    );
    if(this.state.loading){
      form = <Spinner/>
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  };
}

export default ContactData