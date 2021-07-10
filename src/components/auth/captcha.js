import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google';

import { SITE_KEY } from '../../configs/google-recaptcha';

class GoogleRecaptcha extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    this.props.onChange(recaptchaToken); 
  }
  render() {
    return (
      <div>
        <ReCaptcha
          ref={(el) => { this.captchaDemo = el; }}
          size="normal"
          data-theme="dark"
          render="explicit"
          sitekey={SITE_KEY}
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  };
};
export default GoogleRecaptcha;