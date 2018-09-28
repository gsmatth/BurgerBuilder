import React, {Component} from 'react';
import styles from './Modal.css'; 
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  /**
   * we use the lifecycle method below to prevent the modal from being updated unless there is a change in the show status of the backdrop.  The Order summary is a child component of the Modal component and it is not updated either.
   */
  shouldComponentUpdate(nextProps, nextState){
    console.log('[Modal.js] shouldComponentUpdate');
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate (){
    console.log('[Modal.js] componentWillUpdate');
  }

  render() {
    return (
    <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div className={styles.Modal}
        style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}>
        {this.props.children}
      </div>
    </Aux>
    )
  }
 
};

export default Modal;