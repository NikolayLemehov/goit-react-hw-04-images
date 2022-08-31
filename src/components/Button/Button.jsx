import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, page, pages }) => {
  return (
    <button className={s.button} type='button' onClick={onClick}>
      Load more {page}/{pages}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default Button;
