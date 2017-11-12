import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import iconClose from 'assets/images/close-blue.svg';
import './styles.scssm';

const ConfirmModal = ({
  onClose,
  onSubmit,
  active,
}) => (
  <Modal handleClose={onClose} active={active}>
    <div styleName="content">
      <span styleName="close" style={{ backgroundImage: `url(${iconClose})` }} onClick={onClose}></span>
      <h2 styleName="title">
        Se registró la recepción con éxito
      </h2>
      <div style={{textAlign: 'center'}}>
        <Button onClick={onSubmit}>
          VOLVER A DENUNCIAS
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;