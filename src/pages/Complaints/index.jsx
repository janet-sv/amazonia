import React, { PureComponent } from 'react';
import { loadState } from 'utils/localStorage';
import serforService from 'services/serfor';
import formatDate from 'utils/formatDate';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Header from 'components/Header';
import DetailModal from 'components/DetailModal';
import Loader from 'components/Loader';
import logo from 'assets/images/logo.png';
import withoutImage from 'assets/images/without-image.png';
import './styles.scssm';

class Complaints extends PureComponent {
  state = {
    session: loadState('session') || null,
    complaints: null,
    isDetailOpened: false,
    selectedComplaint: null,
    isHistoryShowed: false,
    isLoaderShowed: false,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }

    this.fetchComplaints(this.props.match.params.status);
  };

  fetchComplaints = async (status) => {
    try {
      this.setState(await serforService.getComplaints(status));
    } catch(error) {
      console.log(error);
    }
  };

  getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return 'Nuevo';
      case 2:
        return 'En proceso';
      case 3:
        return 'Rechazado';
      case 4:
        return 'Aceptado';
      default:
      break;
    }
  };

  changeStatus = async (status) => {
    const {
      selectedComplaint,
    } = this.state;

    let {
      complaints,
    } = this.state;

      this.setState({ isLoaderShowed: true });
      const index = complaints.findIndex(complaint => (complaint.id === selectedComplaint.id));

    try {
      const response = await serforService.changeStatus(selectedComplaint.id, status, 1);

      complaints[index].status = status;

      this.setState({
        complaints: complaints,
        isDetailOpened: false,
        isLoaderShowed: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      complaints,
      isDetailOpened,
      selectedComplaint,
      isHistoryShowed,
      isLoaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu logout={() => { this.props.history.push('/login')} }/>
        <div styleName="content">
          <h2 styleName="subtitle">DENUNCIAS</h2>
          <div styleName="complaints">
            {
              complaints && complaints.map(complaint => (
                <div key={`complaint-${complaint.id}`} styleName="complaint" className="has-shadow">
                  <div styleName={`image-wrapper ${complaint.photoType === 2 ? 'no-image' : ''}`} style={{ backgroundImage: `url(${withoutImage})` }}>
                    { complaint.urlPhoto && complaint.photoType === 1 && <img styleName="image" className="absolute-vertical-align" src={complaint.urlPhoto} /> }
                    { complaint.urlPhoto && complaint.photoType === 2 &&
                      <video controls width="auto" height="100%" className="absolute-vertical-align">
                        <source src={complaint.urlPhoto} type="video/mp4"/>
                      </video>
                    }
                  </div>
                  <div styleName="description">
                    <div styleName="description-line">
                      <strong>Fecha de Registro:</strong> { formatDate(complaint.registerDate) }
                    </div>
                    <div styleName="description-line">
                      <strong>Estado:</strong> <span styleName={`color-${complaint.status}`}>{ this.getStatusLabel(complaint.status) }</span>
                    </div>
                    <div styleName="link" onClick={() => {
                      this.setState({
                        selectedComplaint: complaint,
                        isDetailOpened: true,
                      })
                    }}>
                      Ver más info >>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <DetailModal
          active={isDetailOpened}
          complaint={selectedComplaint}
          onClose={() => {
            this.setState({
              isDetailOpened: false,
              isHistoryShowed: false,
            });
          }}
          changeStatus={this.changeStatus}
          isHistoryShowed={isHistoryShowed}
          toggleHistory={() => {
            this.setState({
              isHistoryShowed: !isHistoryShowed,
            });
          }}
        />
        <Loader isActive={isLoaderShowed} />
      </div>
    );
  }
}

export default Complaints;