import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'FirstName LastName'
        },
        value: '',
        validation: {
          required:true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '12345 Blue St'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Boston'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '45009'
        },
        value: '',
        validation: {
          required:true,
          minLength: 5,
          maxLength: 5
        },
        valid:false,
        touched: false
      },
      Country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'US'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false,
        touched: false
      },
      emailAddress: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'somename@test.com'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false,
        touched: false,
      },
      deliveryPreference: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value:'FedEx Overnight', displayValue: 'FedEx Overnight'},
            {value: 'FedEx Ground', displayValue: 'FedEx Ground'},
            {value: 'USPS Overnight', displayValue: 'USPS Overnight'},
            {value: 'USPS 1st Class', displayValue: 'USPS 1st Class'}
          ]
        },
        value: 'FedEx Overnight',
        validation: {},
        valid: true
        }
      },
    formIsValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

  orderHandler = (event) => {
    event.preventDefault();//to prevent a network request from being sent
    const formDataObj = {};
    for(const prop in this.state.orderForm){
      formDataObj[prop] = this.state.orderForm[prop].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formDataObj,
      userId: this.props.userId
      }
      this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, formElementId) => {
    let updatedOrderForm = {...this.state.orderForm};
    let updatedFormElement = {...updatedOrderForm[formElementId]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); 
    updatedOrderForm[formElementId] = updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render(){
    const formElementsArray = [];
    for(let objectPropertyName in this.state.orderForm) {
      formElementsArray.push({
        id: objectPropertyName,
        config: this.state.orderForm[objectPropertyName]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )
    if(this.props.loading){
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

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));