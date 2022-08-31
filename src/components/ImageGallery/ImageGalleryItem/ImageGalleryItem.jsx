import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

class ImageGalleryItem extends Component {
  handleClickImg = () => {
    const {onClickImg, largeImageURL, tags} = this.props;
    onClickImg({largeImageURL, tags});
  }

  render() {
    const {webformatURL, tags, id} = this.props;
    return (
      <li className={s.container}>
        <img
          className={s.image}
          src={webformatURL}
          alt={tags}
          onClick={this.handleClickImg}
          data-key={id}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func,
};

export default ImageGalleryItem;
