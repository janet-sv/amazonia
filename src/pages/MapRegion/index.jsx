import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { loadState } from 'utils/localStorage';
import serforService from 'services/serfor';
import Button from 'components/Button';
import Header from 'components/Header';
import HeatMap from 'components/HeatMap';
import contractIcon from 'assets/images/check-blue.svg';
import nextIcon from 'assets/images/next-blue.svg';
import './styles.scssm';

class MapRegion extends PureComponent {
  state = {
    session: loadState('session') || null,
    complaints: null,
    positions: [],
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }

    this.fetchComplaints(this.props.match.params.status);
  };

  fetchComplaints = async (status) => {
    try {
      this.setState(await serforService.getComplaints(status), () => {
        const positions = this.state.complaints.map(complaint => (
          new window.google.maps.LatLng(parseInt(complaint.latitude), parseInt(complaint.longitude))
        ));
        this.setState({
          positions: positions
        });
      });
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <h2 styleName="subtitle">MAPA DE DENUNCIAS</h2>
          <div>
            <HeatMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuMyAcDMUIAfRV7kGVSxWNiZxvtwx4oNY&v=3.exp&libraries=geometry,drawing,places,visualization"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `480px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              list={this.state.positions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapRegion;