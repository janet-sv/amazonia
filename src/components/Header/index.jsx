import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { deleteState, loadState } from 'utils/localStorage';
import logo from 'assets/images/pawprint.png';
import logoAdmin from 'assets/images/short-logo-admin.png';
import name from 'assets/images/name-logo.png';
import nameAdmin from 'assets/images/name-logo-admin.png';
import menu from 'assets/images/menu-button.svg';
import close from 'assets/images/close-blue.svg';
import userIcon from 'assets/images/profile.jpg';
import './styles.scssm';

class Header extends PureComponent {
  state = {
    isMenuOpened: false,
    session: loadState('session') || null,
  };

  toggleMenu = () => {
    const {
      isMenuOpened,
    } = this.state;

    this.setState({ isMenuOpened: !isMenuOpened });
  };

  logout = (e) => {
    e.preventDefault();
    deleteState('session');
    this.toggleMenu();
    this.props.logout();
  };

  render() {
    const {
      isMenuOpened,
    } = this.state;

    const {
      hasMenu,
      isAdmin,
    } = this.props;

    const icon = isMenuOpened ? close : menu;

    return (
      <div styleName={`header ${!hasMenu ? 'no-menu' : ''}`} className="has-shadow">
        <div styleName={`wrapper ${!hasMenu ? 'no-menu' : ''}`}>
          <Link to={!isAdmin ? '/' : '/admin'}>
            <div styleName={`logo-container ${!hasMenu ? 'no-menu' : ''}`}>
              <div styleName="logo-wrapper">
                {
                  !isAdmin
                  ? <img src={logo} alt="Logo"/>
                  : <img src={logoAdmin} alt="Logo"/>
                }
              </div>
              <div styleName="logo-wrapper has-name">
                {
                  !isAdmin
                  ? <img src={name} alt="Name"/>
                  : <img src={nameAdmin} alt="Name"/>
                }
              </div>
            </div>
          </Link>
          {
            hasMenu && !isAdmin
            && <div styleName="toggle-button" onClick={this.toggleMenu}>
                <img src={icon} alt="Menu"/>
              </div>
          }
          {
            isMenuOpened
            && <ul styleName="menu" className="has-shadow">
                <Link to="/" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">HOME</li>
                </Link>
                <Link to="/denuncias" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">DENUNCIAS</li>
                </Link>
                <Link to="/mapa-regiones" styleName="link">
                  <li styleName="menu-item">MAPA ZONAS</li>
                </Link>
                <Link to="/" styleName="link" onClick={this.logout}>
                  <li styleName="menu-item">CERRAR SESIÓN</li>
                </Link>
              </ul>
          }
          {
            hasMenu && !isAdmin
            && <ul styleName="menu is-desktop">
                <li styleName="menu-item has-photo">
                  <div styleName="photo-wrapper" className="has-shadow">
                    <img src={userIcon} alt="Logo" styleName="logo"/>
                  </div>
                  {this.state.session && <p styleName="username">{this.state.session.user}</p>}
                </li>
                <Link to="/" styleName="link">
                  <li styleName="menu-item">HOME</li>
                </Link>
                <Link to="/denuncias" styleName="link">
                  <li styleName="menu-item">DENUNCIAS</li>
                </Link>
                <Link to="/mapa-regiones" styleName="link">
                  <li styleName="menu-item">MAPA ZONAS</li>
                </Link>
                <Link to="/" styleName="link" onClick={this.logout}>
                  <li styleName="menu-item">CERRAR SESIÓN</li>
                </Link>
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default Header;