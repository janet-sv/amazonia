import React, { PureComponent } from 'react';
import { loadState } from 'utils/localStorage';
import formatDate from 'utils/formatDate';
import serforService from 'services/serfor';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import DetailModal from 'components/DetailModal';
import contractIcon from 'assets/images/contract-blue.svg';
import loader from 'assets/images/loader.gif';
import './styles.scssm';

class Procedure extends PureComponent {
  state = {
    session: loadState('session') || null,
    isModalOpened: false,
    selectedProcedure: null,
    procedures: null,
    loaderShowed: true,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }

    this.fetchProcedures();
  };

  fetchProcedures = async () => {
    try {
      this.setState(await serforService.getProcedures(), () => {
        this.setState({loaderShowed: false});
      });
    } catch(error) {
      console.log(error);
    };
  };

  onSelectProcedure = (procedure) => {
    this.setState({
      selectedProcedure: procedure,
      isModalOpened: true,
    });
  };

  render() {
    const {
      user,
      procedures,
      isModalOpened,
      selectedProcedure,
      loaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <div>
            <div styleName="logo-wrapper" className="has-shadow">
              <img src={contractIcon} alt="Logo"/>
            </div>
            <h1 styleName="title">MIS TRÁMITES</h1>
          </div>
          {
            loaderShowed
            ? <img src={loader} styleName="loader" className="absolute-vertical-align" alt="Cargando ..."/>
            : <div styleName="cards">
                {procedures && procedures.map(procedure => (
                  <div key={`procedure-${procedure.id}`} styleName="card" className="has-shadow">
                    <div styleName="card-name">{procedure.name}</div>
                    <div styleName="card-status">Estado: <span styleName={`status has-code-${procedure.codeStatus}`}>{procedure.status}</span></div>
                    <Button onClick={() => { this.onSelectProcedure(procedure) }}>VER MÁS INFO</Button>
                  </div>
                ))}
              </div>
            }
        </div>
        <DetailModal
          active={isModalOpened}
          procedure={selectedProcedure}
          onClose={() => {
            this.setState({ isModalOpened: false });
          }}
        />
      </div>
    );
  }
}

export default Procedure;