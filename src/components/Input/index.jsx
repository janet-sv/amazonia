import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scssm';

class Input extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.bool,
    typeInput: PropTypes.string,
  };

  static defaultProps = {
    placeholder: false,
    typeInput: 'text',
  };

  state = {
    value: this.props.value || '',
    errorMessage: '',
  };

  cleanInput = () => {
    this.setState({
      value: '',
    });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    }, () => {
      this.validateInput();
    });
  };

  getValue = () => (
    this.state.value
  );

  validateInput = () => {
    return true;
  };

  render() {
    const {
      value,
      errorMessage,
    } = this.state;

    const {
      label,
      type,
      maxLength,
      placeholder,
      typeInput,
    } = this.props;

    return(
      <div styleName="container">
        <label styleName="label">{label}</label>
        <input
          type={typeInput}
          name={type}
          value={value}
          styleName="input"
          onChange={this.onChange}
          maxLength={maxLength}
        />
        <span styleName={`input-error ${errorMessage ? 'has-error' : ''}`}>
          {errorMessage}
        </span>
      </div>
    );
  }
}

export default Input;
