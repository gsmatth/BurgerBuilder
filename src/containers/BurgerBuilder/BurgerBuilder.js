import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://react-my-burger-58e7d.firebaseio.com/ingredients.json')
      .then( response => {
        console.log('[BurgerBuilder.js] componentDidMount axios.get response: ', response);
        this.setState({
          ingredients: response.data
        });
      })
        .catch(err => {
          console.log('[BurgerBuilder.js] componentDidMount, axios.get: ', err);
          this.setState({error: true});
        })
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
    /**
     * the props provided by BrowserRouter are available in this component because we have a <Route> that lists BurgerBuilder as its component in App.js: <Route path="/" exact component={BurgerBuilder} />.  This props is not passed on to any of <BurgerBuilder> children
     */

    const queryParams = [];
    /**
     * produce a new array with strings.  Each string contains the property name and value for each item in the state.ingredients array.
     * ["bacon=1", "cheese=1", "meat=2", "salad=1"]
     */
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    console.log('[BurgerBuilder.js] value of queryParams array: ', queryParams);
    //["bacon=1", "cheese=1", "meat=2", "salad=1"]
    
    //a temporary work around to get totalPrice value to ContactData component
    queryParams.push(`price=${this.state.totalPrice}`);
    
    /**
     * now convert the array of strings to a single string (no array) by joining each string with the others with a "&" character: bacon=1&cheese=1&meat=2&salad=1
     */
    const queryString = queryParams.join('&');
    console.log('[BurgerBuilder.js] value of queryString: ', queryString);
    //bacon=1&cheese=1&meat=2&salad=1
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryString
    });

  }
  
  render(){
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner/>

    if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            price={this.state.totalPrice} 
            addIngredientHandler={this.addIngredientHandler} removeIngredientHandler={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            />
        </Aux>
      );
      orderSummary =  (
        <OrderSummary 
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          clickedDanger={this.purchaseCancelHandler}
          clickedSuccess={this.purchaseContinueHandler}/>
        )
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }
  
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }

};

export default withErrorHandler(BurgerBuilder, axios);