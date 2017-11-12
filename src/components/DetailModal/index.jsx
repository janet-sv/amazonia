import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import formatDate from 'utils/formatDate';
import iconClose from 'assets/images/close-blue.svg';
import iconDown from 'assets/images/arrow-down-sign-to-navigate.svg';
import withoutImage from 'assets/images/without-image.png';
import { Link } from 'react-router-dom';
import './styles.scssm';

const DetailModal = ({
  onClose,
  active,
  complaint,
  changeStatus,
  isHistoryShowed,
  toggleHistory,
}) => (
  <Modal handleClose={onClose} active={active}>
    {
      complaint
      && <div styleName="content">
          <span styleName="close" style={{ backgroundImage: `url(${iconClose})` }} onClick={onClose}></span>
          <div styleName="complaint">
            <div styleName="section has-photo">
              <div styleName="image-wrapper" style={{ backgroundImage: `url(${withoutImage})` }}>
                { complaint.urlPhoto && complaint.photoType === 1 && <img styleName="image" className="absolute-vertical-align" src={complaint.urlPhoto} /> }
                { complaint.urlPhoto && complaint.photoType === 2 &&
                  <video controls width="auto" height="100%" className="absolute-vertical-align" style={{zIndex: 1}}>
                    <source src={complaint.urlPhoto} type="video/mp4"/>
                  </video>
                }
              </div>
              <div styleName={`status has-code-${complaint.status}`}>
                {complaint.status === 1 && 'NUEVA'}
                {complaint.status === 2 && 'En PROCESO'}
                {complaint.status === 3 && 'RECHAZADA'}
                {complaint.status === 4 && 'ACEPTADA'}
              </div>
            </div>
            <div style={{ padding: '10px' }}>
              <div><strong>Denuncia hecha por:</strong> {complaint.dni || 'Anónimo'}</div>
              <div><strong>Fecha de registro:</strong> {formatDate(complaint.registerDate)}</div>
              <div><strong>Animal estuvo encerrado:</strong>
                {` En `}
                {complaint.enclosureType === 1 && 'Jaula'}
                {complaint.enclosureType === 2 && 'Caja'}
                {complaint.enclosureType === 3 && 'Redes'}
                {complaint.enclosureType === 4 && 'Terrario'}
                {complaint.enclosureType === 5 && 'Batea'}
                {complaint.enclosureType === 6 && 'Costal'}
                {complaint.enclosureType === 7 && 'Canasta'}
                {!complaint.enclosureType && 'No registrado'}
              </div>
              <div><strong>Lesiones presentadas: </strong>
                {complaint.injurie === 1 && 'Arañasos o Heridas'}
                {complaint.injurie === 2 && 'Ausencia de alguna extremidad'}
                {complaint.injurie === 3 && 'Agonizando'}
                {!complaint.injurie && 'No registrado'}
              </div>
              <div><strong>Situación encontrado: </strong>
                {complaint.isForSale && 'A la venta'}
                {complaint.isPet && 'Mascota'}
              </div>
            </div>
          </div>
          <div onClick={toggleHistory} styleName="history-title">Historial de denuncia <span styleName="down" style={{ backgroundImage: `url(${iconDown})` }}></span></div>
          {
            isHistoryShowed &&
            <ul styleName="list">
              {
                complaint.registerDate &&
                <li styleName="list-item"><div>Fecha Registro</div><div style={{textAlign: 'right'}}>{formatDate(complaint.registerDate)}</div></li>
              }
              {
                complaint.attendedDate &&
                <li styleName="list-item"><div>Fecha Atendida</div><div style={{textAlign: 'right'}}>{formatDate(complaint.attendedDate)}</div></li>
              }
              {
                complaint.rejectedDate &&
                <li styleName="list-item"><div>Fecha Rechazada</div><div style={{textAlign: 'right'}}>{formatDate(complaint.rejectedDate)}</div></li>
              }
              {
                complaint.acceptedDate &&
                <li styleName="list-item"><div>Fecha Aceptada</div><div style={{textAlign: 'right'}}>{formatDate(complaint.acceptedDate)}</div></li>
              }
            </ul>
          }
          {
            complaint.status === 1 &&
            <div styleName="send-action">
              <Button onClick={() => {changeStatus(2)}}>Enviar a la ATFF</Button>
              <Button onClick={() => {changeStatus(3)}}>Rechazar denuncia</Button>
            </div>
          }
          {
            complaint.status === 2 &&
            <div styleName="send-action">
              <Link to={`/recepciones/${complaint.id}`}><Button onClick={() => {}}>Generar Ficha de recepción</Button></Link>
              <Button onClick={() => {changeStatus(3)}}>Rechazar denuncia</Button>
            </div>
          }
          <div style={{textAlign: 'center', marginTop: '15px'}}>
            <Button onClick={onClose}>
              ENTENDIDO
            </Button>
          </div>
        </div>
    }
  </Modal>
);

export default DetailModal;