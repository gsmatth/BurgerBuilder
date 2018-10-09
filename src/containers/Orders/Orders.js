import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: null
  }

  componentDidMount () {
    axios.get('https://react-my-burger-58e7d.firebaseio.com/orders.json')
      .then(response => {
        this.setState({orders: response})
      });
  }

  render() {
    let posts =  '';
    posts = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice} />
      )
    })

    return (
      <div>
        {posts}
      </div>
    );
  };
}

export default Orders;