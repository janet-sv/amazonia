import React, { PureComponent } from 'react';
import { loadState, deleteState } from 'utils/localStorage';
import formatDate from 'utils/formatDate';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import userIcon from 'assets/images/user-blue.svg';
import './styles.scssm';

class Profile extends PureComponent {
  state = {
    session: loadState('session') || null,
    user: null,
  };

  componentDidMount() {
    const {
      session
    } = this.state;

    if (!session) {
      this.props.history.push('/login');
    } else {
      this.setState({user: session.user});
    }
  };

  render() {
    const {
      user
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          {user &&
            <div>
              <div styleName="logo-wrapper" className="has-shadow">
                <img src={userIcon} alt="Logo"/>
              </div>
              <h1 styleName="title">MI PERFIL</h1>
              <div styleName="card has-name" className="has-shadow">
                <div styleName="name">
                  {user.name}
                  <br/> <strong>{user.firstLastname} {user.secondLastname}</strong>
                  <br/> {user.dni}
                </div>
              </div>
              <div styleName="logout">
                <Button onClick={() => {
                  deleteState('session');
                  this.props.history.push('/login');
                }}>
                  CERRAR SESIÓN
                </Button>
              </div>
            </div>
          }
          {user &&
          <div styleName="cards">
            <div styleName="card" className="has-shadow">
              <div styleName="info-group">
                <div styleName="info-label">Cumpleaños</div>
                <div styleName="info-value">{formatDate(user.bithdate)}</div>
              </div>
              <div styleName="info-group">
                <div styleName="info-label">Correo</div>
                <div styleName="info-value">{user.email}</div>
              </div>
            </div>
            <div styleName="card" className="has-shadow">
              <div styleName="info-group">
                <div styleName="info-label">Domicilio</div>
                <div styleName="info-value">{user.address}</div>
              </div>
              <div styleName="info-group">
                <div styleName="info-label">Distrito</div>
                <div styleName="info-value">{user.district}</div>
              </div>
              <div styleName="info-group">
                <div styleName="info-label">Provincia</div>
                <div styleName="info-value">{user.province}</div>
              </div>
              <div styleName="info-group">
                <div styleName="info-label">Departamento</div>
                <div styleName="info-value">{user.department}</div>
              </div>
            </div>
            <div styleName="card" className="has-shadow">
              <div styleName="info-group">
                <div styleName="info-label">Firma</div>
                <div styleName="info-value has-sign">
                  <img src={user.urlSign} alt="Firma"/>
                </div>
              </div>
              <div styleName="info-group">
                <div styleName="info-label">Donador de órganos</div>
                <div styleName="info-value">{user.isDonor ? 'Sí' : 'No'}</div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default Profile;