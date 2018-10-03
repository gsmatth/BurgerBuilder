import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }
    /**
     * instances of errorHandler will be created for each wrapped component that uses it.  This will create interceptors for each instance.  To keep track of these programmatically and eject them when that wrapped component is no longer in use, we create unique Interceptors for each instance in the componentWillMount.  We remove those same, unique Interceptors in the componentWillUnmount.
     */
    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error})
      });
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
}

export default withErrorHandler