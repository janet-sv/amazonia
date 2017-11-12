import React from 'react';
import PropTypes from 'prop-types';
import loaderImg from 'assets/images/loader.gif';
import './styles.scssm';

const propTypes = {
  isActive: PropTypes.bool,
};

const defaultProps = {
  isActive: false,
};

const Loader = ({
  isActive,
}) => (
  <div styleName={`loader ${isActive ? 'is-active' : ''}`}>
    <img src={loaderImg} alt="loader" styleName="icon"/>
  </div>
);

Loader.propTypes = propTypes;

Loader.defaultProps = defaultProps;

export default Loader;
