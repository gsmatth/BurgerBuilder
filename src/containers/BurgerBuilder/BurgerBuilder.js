import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


//by convention, a global constant uses all caps as variable name.
const INGREDIENT_PRICES = {
  salad: 0.50,
  cheese: 0.50,
  meat: 1.30,
  bacon: 0.70
}

class BurgerBuilder extends Component {
//constructor is an alternative way to add state, but at this point we are not adding any additional properties to our stateful component or adding custom lifecycle methods, so we do not need to use this pattern.  We will assign "state" by itself.
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (updatedIngredients){
    const ingredients = {
      ...updatedIngredients
    };
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    if(updatedCount <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceSubtraction;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState();
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
    console.log('purchasing: ', this.state.purchasing);
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
    console.log('cancel purchase: ', this.state.purchasing);
  }

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
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
          purchasing: false
        });
      })
        .catch(err => {
          console.log('[BurgerBuilder.js] purchaseContinuedHandler error: ', err);
          this.setState({
            loading: false,
            purchasing: false
          });
        })
  }
  
  render(){
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary =  <OrderSummary 
    ingredients={this.state.ingredients}
    price={this.state.totalPrice}
    clickedDanger={this.purchaseCancelHandler}
    clickedSuccess={this.purchaseContinueHandler}
  />;

    if(this.state.loading) {
      orderSummary = <Spinner />
    }
    console.log('[BurgerBuilder] disabledInfo object in render(): ', disabledInfo);
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice} 
          addIngredientHandler={this.addIngredientHandler} removeIngredientHandler={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          />
      </Aux>
    )
  }

};

export default BurgerBuilder;