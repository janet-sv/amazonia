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

class Admin extends PureComponent {
  state = {
    list: null,
    loaderShowed: true,
  };

  componentDidMount() {
    this.fetchReport();
  };

  fetchReport = async () => {
    try {
      this.setState(await serforService.getAllProcedure(), () => {
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
      list,
      loaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu isAdmin />
        <div styleName="content">
          <h2 styleName="subtitle">RELACIÓN DE TRÁMITES</h2>
          <table>
            <thead style={{borderBottom: '1px solid #29b7a3'}}>
              <tr style={{background: 'rgba(41, 183, 163, 0.5)'}}>
                <th style={{width: '10%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>ID</th>
                <th style={{width: '30%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Nombre de Trámite</th>
                <th style={{width: '15%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Tipo de Trámite</th>
                <th style={{width: '10%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Fecha Registro</th>
                <th style={{width: '15%', verticalAlign: 'middle', padding: '10px', textAlign: 'center'}}>Estado</th>
                <th style={{width: '20%', verticalAlign: 'middle', padding: '10px', textAlign: 'center', minWidth: '150px'}}>Acciones</th>
              </tr>
            </thead>
            <tbody style={{position: 'relative'}}>
              {
                loaderShowed
                ? <img src={loader} className="absolute-vertical-align" alt="Cargando ..."/>
                : list && list.map(item => (
                  <tr key={`row-${item.id}`} styleName="row">
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>{item.id}</td>
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'justify'}}>{item.name}</td>
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>{item.type}</td>
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>{formatDate(item.registerDate)}</td>
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>
                      <span styleName={`color-${item.statusCode}`}>{item.status}</span>
                    </td>
                    <td style={{verticalAlign: 'middle', padding: '5px', textAlign: 'center'}}>
                      <Link to={`/detail/${item.id}`} style={{fontWeight: '600'}}>
                        VER HISTORIAL >>
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Admin;