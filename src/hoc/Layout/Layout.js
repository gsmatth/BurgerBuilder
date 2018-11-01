import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  /**
   * we are using prevState functional approach because we are dependent on the previous state to decide what the new state is going to be.  In the sideDrawerCloseHandler above, we are not dependent on the previous state, we just change it to false always.
   */
  sideDrawerToggleHandler = () => {
    this.setState ((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  };

  render() { 
      return (
        <Aux>
          <Toolbar 
            drawerToggleClicked={this.sideDrawerToggleHandler}
            isAuthenticated={this.props.isAuthenticated} />
          <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}
            isAuthenticated={this.props.isAuthenticated} />
          <main className={styles.Content}>
            {this.props.children}
          </main>
        </Aux>
    );
  };

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);