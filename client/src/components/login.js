import React from 'react';
import ReactModalLogin from 'react-modal-login';

import { facebookConfig, googleConfig } from "./social-config";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loading: false,
      error: null
    };

  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  onLoginSuccess(method, response) {
    console.log('logged successfully with ' + method);
  }

  onLoginFail(method, response) {
    console.log('logging failed with ' + method);
    this.setState({
      error: response
    })
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  onTabsChange() {
    this.setState({
      error: null
    });
  }


  render() {

    return (
      <div>
        <ReactModalLogin
          visible={this.props.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            onChange: this.onTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          providers={{
            facebook: {
              config: facebookConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Facebook"
            },
            google: {
              config: googleConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Google"
            }
          }}
        />
      </div>
    )
  }
}

export default Login