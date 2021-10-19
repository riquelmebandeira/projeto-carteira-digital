import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { name, id, options, handle } = this.props;
    return (
      <label htmlFor={ id }>
        { name }
        <select name={ id } id={ id } onChange={ handle }>
          {
            options.map((option, index) => (
              <option key={ index } value={ option }>{option}</option>
            ))
          }
        </select>
      </label>
    );
  }
}

Select.defaultProps = {
  options: [],
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  handle: PropTypes.func.isRequired,
};

export default Select;
