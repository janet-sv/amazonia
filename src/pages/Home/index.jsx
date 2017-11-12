import React, { PureComponent } from 'react';
import { loadState } from 'utils/localStorage';
import serforService from 'services/serfor';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import logo from 'assets/images/logo.png';
import './styles.scssm';

class Home extends PureComponent {
  state = {
    session: loadState('session') || null,
    denied: 0,
    accepted: 0,
    done: 0,
    inProcess: 0,
    recent: 0,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }

    this.fetchStatistics();
  };

  fetchStatistics = async () => {
    try {
      this.setState(await serforService.getProceduresStatistics());
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      denied,
      accepted,
      done,
      inProcess,
      recent,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu logout={() => { this.props.history.push('/login')} }/>
        <div styleName="content">
          <h2 styleName="subtitle">ESTADÍSTICAS DE DENUNCIAS</h2>
          <div styleName="cards">
            <div styleName="card-helper">
              <div styleName="card-wrapper is-big">
                <Link to="/denuncias/1" styleName="link">
                  <div styleName="card is-big" className="has-shadow">
                    <div styleName="card-content" className="absolute-vertical-align">
                      <div styleName="number">{recent}</div>
                      <div styleName="label">Nuevas denuncias</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div styleName="card-helper">
              <div styleName="card-wrapper">
                <Link to="/denuncias">
                  <div styleName="card" className="has-shadow">
                    <div styleName="card-content" className="absolute-vertical-align">
                      <div styleName="number">{done}</div>
                      <div styleName="label">Denuncias totales</div>
                    </div>
                  </div>
                </Link>
                <Link to="/denuncias/4">
                  <div styleName="card" className="has-shadow">
                    <div styleName="card-content" className="absolute-vertical-align">
                      <div styleName="number">{accepted}</div>
                      <div styleName="label">Denuncias aprobadas</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div styleName="card-wrapper">
                <Link to="/denuncias/2">
                  <div styleName="card" className="has-shadow">
                    <div styleName="card-content" className="absolute-vertical-align">
                      <div styleName="number">{inProcess}</div>
                      <div styleName="label">Denuncias en proceso</div>
                    </div>
                  </div>
                </Link>
                <Link to="/denuncias/3">
                  <div styleName="card" className="has-shadow">
                    <div styleName="card-content" className="absolute-vertical-align">
                      <div styleName="number">{denied}</div>
                      <div styleName="label">Denuncias rechazadas</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;