import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

class Searchbar extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(e.target.elements['search'].value.toLowerCase().trim())
  }

  render() {
    return (
      <header className={s.container}>
        <form className={s.form} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={s.btn}>
            <span className={s.btnLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            name='search'
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
