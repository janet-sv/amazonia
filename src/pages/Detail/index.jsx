import React, { PureComponent } from 'react';
import { loadState } from 'utils/localStorage';
import formatDate from 'utils/formatDate';
import serforService from 'services/serfor';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import logo from 'assets/images/logo.png';
import loader from 'assets/images/loader.gif';
import './styles.scssm';

class Detail extends PureComponent {
  state = {
    procedure: null,
    loaderShowed: true,
  };

  componentDidMount() {
    this.fetchReport();
  };

  fetchReport = async () => {
    console.log(this.props);
    try {
      this.setState(await serforService.getHistory(this.props.match.params.id), () => {
        this.setState({
          loaderShowed: false,
        });
      });
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      procedure,
      loaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu isAdmin/>
        <div styleName="content">
          <h2 styleName="subtitle">HISTORIAL DE TRÁMITE</h2>
          {
            loaderShowed
            ? <img src={loader} className="absolute-vertical-align" alt="Cargando ..."/>
            : <div>
                <div style={{marginBottom: '20px'}}>
                  <div style={{display: 'flex'}}>
                    <div style={{fontWeight: '600', minWidth: '200px'}}>ID:</div> <div>{procedure && procedure.id}</div>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div style={{fontWeight: '600', minWidth: '200px'}}>Nombre de Trámite:</div> <div>{procedure && procedure.name}</div>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div style={{fontWeight: '600', minWidth: '200px'}}>Tipo de Trámite:</div> <div>{procedure && procedure.type}</div>
                  </div>
                </div>
                <table style={{width: '100%'}}>
                  <thead style={{borderBottom: '1px solid #29b7a3'}}>
                    <tr style={{background: 'rgba(41, 183, 163, 0.5)'}}>
                      <th style={{width: '50%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Fecha</th>
                      <th style={{width: '50%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      procedure && procedure.history && procedure.history.map((item, key) => (
                        <tr key={`row-${key}`} styleName="row">
                          <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>{formatDate(item.registerDate)}</td>
                          <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>
                            <span styleName={`color-${item.statusCode}`}>{item.status}</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
          }
          <div style={{textAlign: 'center', paddingTop: '40px'}}>
            <Link to="/admin">
              <Button onClick={() => {}}>
                REGRESAR
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;