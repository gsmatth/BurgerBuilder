import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
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
  };

  componentDidMount() {
    console.log('[BurgerBuilder] componentDidMount props: ', this.props);
    this.props.onInitialIngredients();

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
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true});
      console.log('purchasing: ', this.state.purchasing);
  } else {
    this.props.onSetAuthRedirectPath('/checkout')
    this.props.history.push('/auth');
  }
}

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
    console.log('cancel purchase: ', this.state.purchasing);
  }

  purchaseContinueHandler = () => {
    /**
     * the props provided by BrowserRouter are available in this component because we have a <Route> that lists BurgerBuilder as its component in App.js: <Route path="/" exact component={BurgerBuilder} />.  This props is not passed on to any of <BurgerBuilder> children
     */
    console.log('[BurgerBuilder] entered purchaseContinueHandler ')
    this.props.onPurchaseInit();
    console.log('[BurgerBuilder] just completed executing onPurchaseInit')
    this.props.history.push("/checkout");
  }
  
  render(){
    const disabledInfo = {...this.props.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner/>

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
            isAuthenticated={this.props.isAuthenticated}
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
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    onInitialIngredients: () => dispatch(actions.initialIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}
/**
 * this double wrapping works because in withErroHandler hoc, we pass on all props with {...props}.  This allows any connect props to be passed on.
 */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));