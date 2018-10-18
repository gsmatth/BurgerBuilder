import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-58e7d.firebaseio.com/ingredients.json')
    //   .then( response => {
    //     console.log('[BurgerBuilder.js] componentDidMount axios.get response: ', response);
    //     this.setState({
    //       ingredients: response.data
    //     });
    //   })
    //     .catch(err => {
    //       console.log('[BurgerBuilder.js] componentDidMount, axios.get: ', err);
    //       this.setState({error: true});
    //     })
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
    return sum > 0;
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
    this.props.history.push("/checkout");
  }
  
  render(){
    const disabledInfo = {...this.props.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner/>

    if(this.props.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            price={this.props.totalPrice} 
            addIngredientHandler={this.props.onAddIngredient} 
            removeIngredientHandler={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            />
        </Aux>
      );
      orderSummary =  (
        <OrderSummary 
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
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

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient}),
    onRemoveIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient}),
  }
}
/**
 * this double wrapping works because in withErroHandler hoc, we pass on all props with {...props}.  This allows any connect props to be passed on.
 */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));