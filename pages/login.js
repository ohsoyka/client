import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import Wrapper from '../components/Wrapper';
import Content from '../components/Content';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import Session from '../services/session';

class LoginPage extends React.Component {
  static async getInitialProps({ req, res }) {
    if (Session.isAuthenticated(req)) {
      res.redirect('/');
    }

    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      login: '',
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleKeyPress(event) {
    if (event.which === 13) {
      this.authenticate();
    }
  }

  async authenticate() {
    return Session.authenticate({ login: this.state.login, password: this.state.password })
      .then(() => Router.push('/admin'))
      .catch((error) => {
        if (error.status === 403) {
          this.setState({
            error: error.message,
          });
        }
      });
  }

  render() {
    return (
      <Wrapper>
        <Head>
          <title>Вхід</title>
        </Head>
        <Content className="container layout-row layout-align-center-center layout-wrap">
          <h1 className="text-center flex-100">Вхід</h1>
          <div className="children-vertical-padding layout-row layout-wrap layout-align-center-center flex-100 flex-gt-xs-50">
            <Input
              lite
              compact
              value={this.state.login}
              label="Лоґін"
              onChange={login => this.setState({ login })}
              className="flex-100"
            />
            <Input
              lite
              compact
              value={this.state.password}
              type="password"
              label="Пароль"
              onChange={password => this.setState({ password })}
              className="flex-100"
            />
            <Button onClick={this.authenticate}>Увійти</Button>
            {this.state.error && <p className="flex-100 text-center">{this.state.error}</p>}
          </div>
        </Content>
      </Wrapper>
    );
  }
}

export default LoginPage;
