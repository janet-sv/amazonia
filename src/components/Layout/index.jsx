import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: 'Add content through children nodes',
};

const Layout = ({
  children,
}) => (
  <div>
    {children}
  </div>
);

Layout.propTypes = propTypes;

Layout.defaultProps = defaultProps;

export default Layout;