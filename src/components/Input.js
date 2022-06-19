import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { text, id, handle, value } = this.props;
    return (
      <label htmlFor={ id }>
        <p>{ text }</p>
        <input type="text" id={ id } onChange={ handle } value={ value } />
      </label>
    );
  }
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
