import React, { PureComponent } from 'react';
import serforService from 'services/serfor';
import { loadState, saveState } from 'utils/localStorage';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import logo from 'assets/images/pawprint.png';
import Loader from 'components/Loader';
import './styles.scssm';

class Login extends PureComponent {
  state = {
    session: loadState('session') || null,
    loaderShowed: false,
  };
  componentDidMount() {
    if (this.state.session) {
      this.props.history.push('/');
    }
  };

  login = () => {
    this.setState({ loaderShowed: true});

    const credentials = {
      dni: this.refs.inputDni.getValue(),
      password: this.refs.inputPass.getValue(),
    };

    this.setState({ loaderShowed: true});
    setTimeout(2000);

    this.setState({ session: { user: 'Franco Tume' }}, () => {
      saveState('session', this.state.session);
      this.setState({ loaderShowed: false});

      this.props.history.push('/');
    });
  };

  render() {
    const {
      loaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header />
        <div styleName="content">
          <div styleName="form">
            <div>
              <div styleName="logo-wrapper" className="has-shadow">
                <img src={logo} alt="Logo"/>
              </div>
            </div>
            <div styleName="card" className="has-shadow">
              <Input label="Usuario" ref="inputDni" />
              <Input typeInput="password" label="Contraseña" ref="inputPass"/>
              <div styleName="button-wrapper">
                <Button onClick={this.login}>
                  INGRESAR
                </Button>
              </div>
              <div styleName="link-wrapper">
                <Link to="/">Olvidé mi contraseña</Link>
              </div>
            </div>
          </div>
        </div>
        <Loader isActive={loaderShowed}/>
      </div>
    );
  }
}

export default Login;