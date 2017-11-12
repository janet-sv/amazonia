import React from 'react';
import './styles.scssm';

const Button = ({
  children,
  onClick,
}) => (
  <button styleName="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;