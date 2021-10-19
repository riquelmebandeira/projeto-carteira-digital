import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, id } = this.props;
    return (
      <label htmlFor={ id }>
        { name }
        <input type="text" id={ id } />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
