import React from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements['search'].value.toLowerCase().trim());
  };

  return (
    <header className={s.container}>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <button type='submit' className={s.btn}>
          <span className={s.btnLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type='text'
          name='search'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
