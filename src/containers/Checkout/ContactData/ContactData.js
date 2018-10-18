import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        touched: false, 
        valid: true
        }
      },
    loading: false,
    formIsValid: false
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minlength){
      isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();//to prevent a request from being sent
    console.log('[ContactData] props.ingredients: ', this.props.ingredients);
        this.setState({
          loading: false,
          touched: false,
    });

    const formDataObj = {};
    for(const prop in this.state.orderForm){
      formDataObj[prop] = this.state.orderForm[prop].value;
    }
    console.log('[ContactData.js] formDataObj in orderHandler: ', formDataObj);

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formDataObj
      }

    axios.post('/orders.json', order)
      .then(response => {
        console.log('[BurgerBuilder.js] purchaseContinueHandler response: ', response);
        this.setState({
          loading: false,
          touched: false,
        });
        this.props.history.push('/');
      })
        .catch(err => {
          console.log('[BurgerBuilder.js] purchaseContinuedHandler error: ', err);
          this.setState({
            loading: false,
            touched: false,
          });
        })
  }

  inputChangedHandler = (event, formElementId) => {
    console.log('[ContactData.js] value of event.target.value and formElementId passed to inputChangedHandler: ', event.target.value, formElementId);
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
    console.log('[ContactData.js] value of formElementArray in render: ', formElementsArray);
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

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);