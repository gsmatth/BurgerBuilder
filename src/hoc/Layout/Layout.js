import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    console.log('[Layout.js] entered sideDrawerClosedHandler');
    this.setState({showSideDrawer: false});
  };

  /**
   * we are using prevState functional approach because we are dependent on the previous state to decide what the new state is going to be.  In the sideDrawerCloseHandler above, we are not dependent on the previous state, we just change it to false always.
   */
  sideDrawerToggleHandler = () => {
    console.log('[Layout.js] entered sideDrawerToggleHandler');
    this.setState ((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  };

  render() { 
      return (
        <Aux>
          <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler} />
          <main className={styles.Content}>
            {this.props.children}
          </main>
        </Aux>
    );
  };

}
export default Layout;