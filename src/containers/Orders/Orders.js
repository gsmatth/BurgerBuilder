import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  /**
   * below we convert the javascript object returned from get call, to an array "fetchedOrders".  for (var variable in objectName) {statement}
   *  var myObj = {a: 1, b: 2, c: 3}, myKeys = [];
   *  for (let property in myObj) {
   *    myKeys.push(property);
   *  }
   * myKeys; //['a','b','c'];
   */
  componentDidMount () {
    axios.get('/orders.json')
      .then(response => {
        console.log('[Orders.js] response.data object in componentDidMount: ', response.data);
        const fetchedOrders = [];
        for(let key in response.data){
          fetchedOrders.push(
            {...response.data[key],
              id: key});
        }
        console.log('[Orders.js] fetchedOrders array after get: ', fetchedOrders);
        this.setState({
          loading: false,
          orders: fetchedOrders
        })
      })
      .then(() => {
        console.log('[Orders.js] state.orders after update in componentDidMount: ', this.state.orders);
      })
          .catch(err => {
            this.setState({loading: false})
          })

  }

  render () {
    console.log('[Orders.js] state.orders in render: ', this.state.orders);
    return (
        <div>
            {this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.totalPrice} />
            ))}
        </div>
    );
}
}


export default withErrorHandler(Orders, axios);