import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({onClickImg, largeImageURL, tags, webformatURL, id}) {
  const handleClickImg = () => onClickImg({ largeImageURL, tags });

  return (
    <li className={s.container}>
      <img
        className={s.image}
        src={webformatURL}
        alt={tags}
        onClick={handleClickImg}
        data-key={id}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func,
};

export default ImageGalleryItem;
