import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, id, handle } = this.props;
    return (
      <label htmlFor={ id }>
        { name }
        <input type="text" id={ id } onChange={ handle } />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
};

export default Input;
